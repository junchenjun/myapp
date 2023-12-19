import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { useCallback, useRef } from 'react';
import { ScrollView, SectionList, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/atoms/menuItem/MenuItem';
import { WeeklyActivity } from '~components/molecules/weeklyActivity/WeeklyActivity';
import { WorkoutContainer } from '~components/organisms/workoutContainer/WorkoutContainer';
import { BottomMenu } from '~components/organisms/bottomMenu/BottomMenu';
import { SelectPlanModal } from '~components/organisms/selectPlanModal/SelectPlanModal';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

const Home = () => {
  const styles = useThemedStyles(createStyles);
  const planList = useAppSelector(state => state.plans.list);

  const selectPlanModalRef = useRef<BottomSheetModal>(null);
  const editPlanModalRef = useRef<BottomSheetModal>(null);

  const handleEditPlanModalPress = useCallback(() => {
    editPlanModalRef.current?.present();
  }, []);
  const handleSelectPlanModalPress = useCallback(() => {
    selectPlanModalRef.current?.present();
  }, []);

  const sectionData =
    planList?.map(p => {
      return { title: p.name, data: p.workouts, id: p.id };
    }) || [];

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
            { iconLeft: icons.Plus, title: 'New Workout Plan' },
            { iconLeft: icons.Edit, title: 'Edit Plan' },
            {
              iconLeft: icons.Trash,
              danger: true,
              title: 'Delete Plan',
            },
          ]}
        />
        <SelectPlanModal modalRef={selectPlanModalRef} />
        <View style={styles.buttonGroup}>
          <View style={styles.selectPlan}>
            <MenuItem
              iosScaleDownAnimation
              color='primaryInverse'
              iconLeft={icons.Collections}
              iconRight={icons.More}
              roundedTopCorners
              roundedBottomCorners
              title='Plan B'
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
        <SectionList
          style={styles.list}
          sections={sectionData}
          stickySectionHeadersEnabled={false}
          keyExtractor={(item, index) => item.name + index}
          scrollEnabled={false}
          renderItem={({ item, section, index }) => (
            <WorkoutContainer
              key={index}
              title={item.name}
              style={styles.gap}
              header={{
                labels: ['Shoulder', 'biceps'],
              }}
              menu={[
                { iconLeft: icons.Edit, title: 'Edit Workout' },
                {
                  iconLeft: icons.Trash,
                  danger: true,
                  title: 'Delete Workout',
                },
              ]}
              onPress={() => {
                return router.push({
                  pathname: 'preview',
                  params: { planId: section.id, workoutId: item.id, title: item?.name },
                });
              }}
              descItems={[`${item.exercises.length} Exercises`, '5 days ago']}
            />
          )}
        />
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
    gap: {
      marginBottom: theme.spacing[3],
    },
    list: {
      flex: 1,
      overflow: 'hidden',
    },
    buttonGroup: { flexDirection: 'row', gap: 8 },
    selectPlan: { flex: 1 },
  });
};
