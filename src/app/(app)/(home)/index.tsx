import { router } from 'expo-router';
import { Suspense, useState } from 'react';
import { ScrollView, SectionList, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/menuItem/MenuItem';
import { Modal } from '~components/modal/Modal';
import { WorkoutContainer } from '~components/workoutContainer/WorkoutContainer';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

const Home = () => {
  const styles = useThemedStyles(createStyles);
  const planList = useAppSelector(state => state.plans.list);
  const [isModalActive, setIsModalActive] = useState(false);

  const sectionData =
    planList?.map(p => {
      return { title: p.name, data: p.workouts, id: p.id };
    }) || [];

  return (
    <>
      <Modal isActive={isModalActive} setIsActive={setIsModalActive}>
        <ScrollView contentContainerStyle={styles.content} bounces={false}>
          <MenuItem iconLeft={icons.Edit} roundedBottomCorners roundedTopCorners title='New Workout Plan' />
          <MenuItem iconLeft={icons.Switch} roundedBottomCorners roundedTopCorners title='New Workout Plan' />
          <MenuItem danger iconLeft={icons.Trash} roundedBottomCorners roundedTopCorners title='Delete Current Plan' />
        </ScrollView>
      </Modal>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Suspense fallback={<View />}>
          <SectionList
            style={styles.list}
            sections={sectionData}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => item.name + index}
            scrollEnabled={false}
            contentContainerStyle={{ ...styles.gap }}
            renderItem={({ item, section, index }) => (
              <WorkoutContainer
                key={index}
                title={item.name}
                header={{
                  labels: ['Shoulder', 'biceps'],
                  onPress: () => setIsModalActive(true),
                }}
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
        </Suspense>
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
    },
    gap: {
      gap: theme.spacing[3],
    },
    list: {
      flex: 1,
      overflow: 'hidden',
    },
    content: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[5],
      paddingBottom: theme.spacing[6],
      gap: theme.spacing[2],
    },
  });
};
