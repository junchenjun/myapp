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
import { FolderNameModal } from '~components/organisms/FolderNameModal/FolderNameModal';
import { SelectFolderModal } from '~components/organisms/selectFolderModal/SelectFolderModal';
import { WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';
import { deleteFolder } from '~firebase/firebaseConfig';
import { IFolder } from '~redux/foldersSlice';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

const Home = () => {
  const [folderId, setFolderId] = useState<IFolder['id']>();

  const styles = useThemedStyles(createStyles);
  const folders = useAppSelector(state => state.folders);

  const selectFolderModalRef = useRef<BottomSheetModal>(null);
  const editFolderNameRef = useRef<BottomSheetModal>(null);
  const addFolderModalRef = useRef<BottomSheetModal>(null);
  const folderConfigModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (!folderId || !folders.find(i => i.id === folderId)) {
      setFolderId(folders?.[0]?.id || undefined);
    }
  }, [folderId, folders]);

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
        setFolderId(folders.filter(i => i.id !== folderId)[0].id);
        folderConfigModalRef.current?.dismiss();
      });
  }, [folderId, folders]);

  const workouts = folders && folderId && folders.find(i => i.id === folderId)?.workouts;
  const folderName = folders?.find(i => i.id === folderId)?.name;

  const folderLimitAlert = () =>
    Alert.alert('Maximum folder limit reached', 'You can have up to 5 folders', [{ text: 'OK' }], {
      cancelable: true,
    });

  const deleteAlert = () =>
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
    );

  const maximumFolderLimit = 5;

  return (
    <>
      {/* Modals */}
      <Modal modalRef={folderConfigModalRef} backgroundColorKey='surface'>
        <BottomMenu
          items={[
            {
              iconLeft: icons.FolderPlus,
              title: 'New Folder',
              onPress: folders.length >= 5 ? folderLimitAlert : onAddFolderPress,
            },
            { iconLeft: icons.Edit, title: 'Edit Folder Name', onPress: onEditFolderNamePress },
            {
              iconLeft: icons.Trash,
              danger: true,
              title: 'Delete Folder',
              onPress: deleteAlert,
              disabled: folders.length <= 1,
            },
          ]}
        />
      </Modal>
      <Modal modalRef={selectFolderModalRef} title='Select Folder'>
        <SelectFolderModal
          onSelect={id => setFolderId(id)}
          folders={folders}
          selectedID={folderId}
          onActionButton={folders.length >= maximumFolderLimit ? folderLimitAlert : onAddFolderPress}
        />
      </Modal>
      <Modal modalRef={addFolderModalRef} title='Create Folder'>
        <FolderNameModal setFolder={setFolderId} />
      </Modal>
      <Modal modalRef={editFolderNameRef} title='Edit Folder Name'>
        <FolderNameModal setFolder={setFolderId} folderId={folderId} />
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
              iosScaleDownAnimation
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
              iosScaleDownAnimation
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
            {workouts.map((item, index) => (
              <WorkoutItem
                contained
                key={index}
                title={item.title}
                header={{
                  labels: ['Shoulder', 'biceps'],
                  menu: [
                    { iconLeft: icons.Edit, title: 'Edit Workout' },
                    {
                      iconLeft: icons.Trash,
                      danger: true,
                      title: 'Delete Workout',
                    },
                  ],
                }}
                onPress={() => {
                  return router.push({
                    pathname: 'preview',
                    params: { folderId, workoutId: item.id, title: item?.title },
                  });
                }}
                descItems={[`${item.exercises.length} Exercises`, '5 days ago']}
              />
            ))}
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
      flex: 1,
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
