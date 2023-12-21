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
import { IPlan } from '~redux/planSlice';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

const Home = () => {
  const [folderId, setFolderId] = useState<IPlan['id']>();
  const styles = useThemedStyles(createStyles);
  const planList = useAppSelector(state => state.plans.list);

  const selectPlanModalRef = useRef<BottomSheetModal>(null);
  const addPlanModalRef = useRef<BottomSheetModal>(null);
  const editPlanModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    setFolderId(planList?.[0].id || undefined);
  }, [planList]);

  const handleEditPlanModalPress = useCallback(() => {
    editPlanModalRef.current?.present();
  }, []);
  const handleSelectPlanModalPress = useCallback(() => {
    selectPlanModalRef.current?.present();
  }, []);
  const handleAddPlanModalPress = useCallback(() => {
    editPlanModalRef.current?.dismiss();
    selectPlanModalRef.current?.dismiss();
    addPlanModalRef.current?.present();
  }, []);

  const folders = planList?.map(p => {
    return { id: p.id, name: p.name };
  });
  const workouts = planList && folderId && planList.find(i => i.id === folderId)?.workouts;

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
        {/* Plan Buttons */}
        <BottomMenu
          modalRef={editPlanModalRef}
          items={[
            { iconLeft: icons.FolderPlus, title: 'New Folder', onPress: handleAddPlanModalPress },
            { iconLeft: icons.Edit, title: 'Edit This Folder' },
            {
              iconLeft: icons.Trash,
              danger: true,
              title: 'Delete Folder',
            },
          ]}
        />
        {folderId && folders && (
          <Modal modalRef={selectPlanModalRef} title='Select Folder'>
            <SelectFolderModal
              onSelect={id => setFolderId(id)}
              folders={folders}
              selectedID={folderId}
              onActionButton={handleAddPlanModalPress}
            />
          </Modal>
        )}
        <Modal modalRef={addPlanModalRef} title='Create Folder'>
          <AddFolderModal />
        </Modal>
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
              onPress={handleSelectPlanModalPress}
              size='sm'
              onRightIconPress={handleEditPlanModalPress}
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
                    params: { planId: folderId, workoutId: item.id, title: item?.name },
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
