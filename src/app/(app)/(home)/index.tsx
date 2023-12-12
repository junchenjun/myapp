import { useRouter } from 'expo-router';
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
  const router = useRouter();
  const planList = useAppSelector(state => state.plans.list);
  const [isModalActive, setIsModalActive] = useState(false);

  const sectionData =
    planList?.map(p => {
      return { title: p.name, data: p.workouts, id: p.id };
    }) || [];

  return (
    <>
      <Modal isActive={isModalActive} setIsActive={setIsModalActive}>
        <View style={styles.content}>
          <MenuItem iconLeft={icons.Zap} roundedBottomCorners roundedTopCorners title='New Workout Plan' />
          <MenuItem iconLeft={icons.Zap} roundedBottomCorners roundedTopCorners title='New Workout Plan' />
          <MenuItem danger iconLeft={icons.Zap} roundedBottomCorners roundedTopCorners title='Delete Current Plan' />
        </View>
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
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[5],
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      paddingBottom: theme.spacing[6],
      gap: theme.spacing[2],
    },
  });
};
