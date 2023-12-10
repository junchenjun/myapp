import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { ScrollView, SectionList, StyleSheet, View } from 'react-native';

import { Text } from '~components/text/Text';
import { WorkoutContainer } from '~components/workoutContainer/WorkoutContainer';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

const Home = () => {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();
  const planList = useAppSelector(state => state.plans.list);

  const sectionData =
    planList?.map(p => {
      return { title: p.name, data: p.workouts, id: p.id };
    }) || [];

  return (
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
                onPress: () => null,
              }}
              onPress={() => {
                return router.push({
                  pathname: 'preview',
                  params: { planId: section.id, workoutId: item.id },
                });
              }}
              descItems={[`${item.exercises.length} Exercises`, '5 days ago']}
            />
          )}
          renderSectionHeader={({ section }) => {
            return (
              <View>
                <Text text={section.title + ' (' + section.data.length + ')'} />
              </View>
            );
          }}
        />
      </Suspense>
    </ScrollView>
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
      gap: theme.spacing[4],
    },
    list: {
      flex: 1,
      overflow: 'hidden',
    },
  });
};
