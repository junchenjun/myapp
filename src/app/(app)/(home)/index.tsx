import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { icons } from '~assets/icons';
import { ListItem } from '~components/atoms/listItem/ListItem';
import { Modal } from '~components/atoms/modal/Modal';
import { WeeklyActivity } from '~components/molecules/weeklyActivity/WeeklyActivity';
import { BottomMenu } from '~components/organisms/bottomMenu/BottomMenu';
import { EditFolderName } from '~components/organisms/editFolderName/EditFolderName';
import { SelectFolder } from '~components/organisms/selectFolder/SelectFolder';
import { WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';
import { collections, deleteFolder, deleteWorkout, firebaseStore } from '~firebase/firebaseConfig';
import { IFolder, setSelectedFolder } from '~redux/foldersSlice';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { IWorkout, setWorkout } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';
import { getWorkoutTargetMuscles } from '~utils/workouts';

const Home = () => {
  const [folderId, setFolderId] = useState<IFolder['id']>();
  const [workouts, setWorkouts] = useState<IWorkout[]>();
  const folders = useAppSelector(state => state.folders.all);
  const user = useAppSelector(state => state.auth.user);
  const dispatch = useAppDispatch();

  const selectFolderModalRef = useRef<BottomSheetModal>(null);
  const editFolderNameRef = useRef<BottomSheetModal>(null);
  const addFolderModalRef = useRef<BottomSheetModal>(null);
  const folderConfigModalRef = useRef<BottomSheetModal>(null);

  const styles = useThemedStyles(createStyles);

  // onSnapshot
  useEffect(() => {
    const subscriber = firebaseStore()
      .collection(collections.user.name)
      .doc(user?.uid)
      .collection(collections.user.subCollections.plan.name)
      .doc(folderId)
      .collection(collections.user.subCollections.plan.subCollections.workouts.name)
      .onSnapshot(snapshot => {
        const data = [] as IWorkout[];
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id } as IWorkout);
        });
        setWorkouts(data);
      });
    return () => subscriber();
  }, [folderId, user?.uid]);

  useEffect(() => {
    if (!folderId || !folders?.find(i => i.id === folderId)) {
      setFolderId(folders?.[0]?.id || undefined);
    }
  }, [folderId, folders]);

  useEffect(() => {
    folderId && dispatch(setSelectedFolder(folderId));
  }, [dispatch, folderId]);

  const onFolderConfigPress = useCallback(() => {
    folderConfigModalRef.current?.present();
  }, []);
  const onEditFolderNamePress = useCallback(() => {
    editFolderNameRef.current?.present();
    folderConfigModalRef.current?.dismiss();
  }, []);
  const onSelectFolderPress = useCallback(() => {
    selectFolderModalRef.current?.present();
  }, []);
  const onAddFolderPress = useCallback(() => {
    addFolderModalRef.current?.present();
    folderConfigModalRef.current?.dismiss();
    selectFolderModalRef.current?.dismiss();
  }, []);
  const onFolderDelete = useCallback(() => {
    folderId &&
      deleteFolder(folderId).then(() => {
        setFolderId(folders?.filter(i => i.id !== folderId)[0].id);
        folderConfigModalRef.current?.dismiss();
      });
  }, [folderId, folders]);

  const folderName = folders?.find(i => i.id === folderId)?.name;

  const folderLimitAlert = useCallback(
    () =>
      Alert.alert('Maximum folder limit reached', 'You can have up to 5 folders', [{ text: 'OK' }], {
        cancelable: true,
      }),
    []
  );

  const deleteFolderAlert = useCallback(
    () =>
      Alert.alert(
        `Delete This Folder?`,
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'Delete', onPress: onFolderDelete },
        ],
        {
          cancelable: true,
        }
      ),
    [onFolderDelete]
  );

  const deleteWorkoutAlert = useCallback(
    (id: string) =>
      Alert.alert(
        `Delete This Workout?`,
        '',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          { text: 'Delete', onPress: () => folderId && deleteWorkout(folderId, id) },
        ],
        {
          cancelable: true,
        }
      ),
    [folderId]
  );

  const maximumFolderLimit = 5;

  const onWorkoutItemPress = useCallback(
    (item: IWorkout) => {
      router.push({
        pathname: 'preview',
        params: { title: item?.title },
      });
      dispatch(setWorkout(item));
    },
    [dispatch]
  );

  return (
    <>
      {/* Modals */}
      <Modal modalRef={folderConfigModalRef} backgroundColorKey='surface'>
        <BottomMenu
          items={[
            {
              iconLeft: icons.FolderPlus,
              title: 'New Folder',
              onPress: folders && folders?.length >= 5 ? folderLimitAlert : onAddFolderPress,
            },
            { iconLeft: icons.Edit, title: 'Edit Folder Name', onPress: onEditFolderNamePress },
            {
              iconLeft: icons.Trash,
              danger: true,
              title: 'Delete Folder',
              onPress: deleteFolderAlert,
              disabled: folders && folders?.length <= 1,
            },
          ]}
        />
      </Modal>
      <Modal modalRef={selectFolderModalRef} title='Select Folder'>
        <SelectFolder
          onSelect={id => setFolderId(id)}
          folders={folders}
          selectedID={folderId}
          onActionButton={folders && folders?.length >= maximumFolderLimit ? folderLimitAlert : onAddFolderPress}
        />
      </Modal>
      <Modal modalRef={addFolderModalRef} title='Create Folder'>
        <EditFolderName setFolder={setFolderId} />
      </Modal>
      <Modal modalRef={editFolderNameRef} title='Edit Folder Name'>
        <EditFolderName setFolder={setFolderId} folderId={folderId} />
      </Modal>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* WeeklyActivity */}
        <WeeklyActivity
          config={{
            mo: { value: 'Mo', variant: 'completed' },
            tu: { value: 'Tu', variant: 'completed' },
            we: { value: 'We', variant: 'completed' },
            th: { value: 'Tu', variant: 'active', onPress: () => null },
            fr: { value: 'Fr', variant: 'inactive' },
            sa: { value: 'Sa', variant: 'inactive' },
            su: { value: 'Su', variant: 'inactive' },
          }}
        />
        {/* Buttons */}
        <View style={styles.buttonGroup}>
          <View style={styles.selectPlan}>
            <ListItem
              color='primaryInverse'
              iconLeft={icons.Collections}
              iconRight={icons.More}
              roundedTopCorners
              roundedBottomCorners
              title={folderName}
              onPress={onSelectFolderPress}
              size='sm'
              onRightIconPress={onFolderConfigPress}
            />
          </View>
          <View>
            <ListItem
              color='primary'
              size='sm'
              iconRight={icons.Plus}
              roundedTopCorners
              roundedBottomCorners
              onPress={() => router.push('editWorkout')}
            />
          </View>
        </View>

        {/* List */}
        {workouts && (
          <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.list}>
            {workouts.map((item, index) => {
              const descItems = [`${item.exercises.length} Exercises`];
              if (item.lastPerformed) {
                descItems.push(item.lastPerformed);
              }
              return (
                <WorkoutItem
                  contained
                  key={index}
                  title={item.title}
                  header={{
                    labels: getWorkoutTargetMuscles(item),
                    menu: [
                      { iconLeft: icons.Edit, title: 'Edit Workout' },
                      {
                        iconLeft: icons.Trash,
                        danger: true,
                        title: 'Delete Workout',
                        onPress: () => item.id && deleteWorkoutAlert(item.id),
                      },
                    ],
                  }}
                  onPress={() => onWorkoutItemPress(item)}
                  descItems={descItems}
                />
              );
            })}
          </Animated.View>
        )}
      </ScrollView>
    </>
  );
};

export default Home;

const createStyles = (theme: ITheme) => {
  return StyleSheet.create({
    scroll: {
      backgroundColor: theme.colors.surfaceExtraDim,
      paddingHorizontal: theme.spacing[4],
      gap: theme.spacing[3],
    },
    list: {
      gap: theme.spacing[3],
    },
    buttonGroup: { flexDirection: 'row', gap: 8 },
    selectPlan: { flex: 1 },
  });
};
