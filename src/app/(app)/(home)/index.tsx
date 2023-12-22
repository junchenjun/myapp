import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/atoms/menuItem/MenuItem';
import { Modal } from '~components/atoms/modal/Modal';
import { WeeklyActivity } from '~components/molecules/weeklyActivity/WeeklyActivity';
import { AddFolderModal } from '~components/organisms/addFolderModal/AddFolderModal';
import { BottomMenu } from '~components/organisms/bottomMenu/BottomMenu';
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
  const openFolderConfigModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setFolderId(folders?.[0]?.id || undefined);
  }, [folders]);

  const onFolderConfigPress = useCallback(() => {
    openFolderConfigModalRef.current?.present();
  }, []);
  const onEditFolderNamePress = useCallback(() => {
    editFolderNameRef.current?.present();
    selectFolderModalRef.current?.dismiss();
  }, []);
  const onSelectFolderPress = useCallback(() => {
    selectFolderModalRef.current?.present();
  }, []);
  const onAddFolderPress = useCallback(() => {
    addFolderModalRef.current?.present();
    openFolderConfigModalRef.current?.dismiss();
    selectFolderModalRef.current?.dismiss();
  }, []);

  const handleFolderDelete = useCallback(() => {
    folderId && deleteFolder(folderId).then(() => openFolderConfigModalRef.current?.dismiss());
  }, [folderId]);

  const workouts = folders && folderId && folders.find(i => i.id === folderId)?.workouts;

  return (
    <>
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
        <BottomMenu
          modalRef={openFolderConfigModalRef}
          items={[
            { iconLeft: icons.FolderPlus, title: 'New Folder', onPress: onAddFolderPress },
            { iconLeft: icons.Edit, title: 'Edit Folder Name' },
            {
              iconLeft: icons.Trash,
              danger: true,
              title: 'Delete Folder',
              onPress: folderId ? handleFolderDelete : undefined,
              disabled: folders.length <= 1,
            },
          ]}
        />
        <Modal modalRef={selectFolderModalRef} title='Select Folder'>
          <SelectFolderModal
            onSelect={id => setFolderId(id)}
            folders={folders}
            selectedID={folderId}
            onActionButton={onAddFolderPress}
          />
        </Modal>
        <Modal modalRef={addFolderModalRef} title='Create Folder'>
          <AddFolderModal setFolder={setFolderId} />
        </Modal>
        {/* <Modal modalRef={editFolderNameRef} title='Create Folder'>
          <AddFolderModal />
        </Modal> */}
        <View style={styles.buttonGroup}>
          <View style={styles.selectPlan}>
            <MenuItem
              iosScaleDownAnimation
              color='primaryInverse'
              iconLeft={icons.Collections}
              iconRight={icons.More}
              roundedTopCorners
              roundedBottomCorners
              title={folders?.find(i => i.id === folderId)?.name}
              onPress={onSelectFolderPress}
              size='sm'
              onRightIconPress={onFolderConfigPress}
            />
          </View>
          <View>
            <MenuItem
              iosScaleDownAnimation
              color='primary'
              size='sm'
              iconRight={icons.Plus}
              roundedTopCorners
              roundedBottomCorners
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
                title={item.name}
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
                    params: { folderId, workoutId: item.id, title: item?.name },
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
