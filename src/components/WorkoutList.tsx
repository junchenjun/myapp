import { useRouter } from 'expo-router';
import { SectionList, StyleSheet, View } from 'react-native';

import { ThemedText } from '~components/ThemedText';
import { WorkoutContainer } from '~components/WorkoutContainer';
import { useAppSelector } from '~redux/store';
import { ITheme } from '~redux/themeSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

export const WorkoutList = () => {
  const styles = useThemedStyles(themedStyles);
  const planList = useAppSelector(state => state.plans.list);
  const router = useRouter();

  const sectionData =
    planList?.map(p => {
      return { title: p.name, data: p.workouts, id: p.id };
    }) || [];

  return (
    <SectionList
      style={styles.container}
      sections={sectionData}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item, index) => item.name + index}
      scrollEnabled={false}
      renderItem={({ item, section, index }) => (
        <WorkoutContainer
          key={index}
          onPress={() => {
            return router.push({
              pathname: 'preview',
              params: { planId: section.id, workoutId: item.id },
            });
          }}
          workouts={item}
          index={index}
        />
      )}
      renderSectionHeader={({ section }) => {
        return (
          <View style={styles.sectionTitle}>
            <ThemedText text={section.title + ' (' + section.data.length + ')'} color='text100' size='body4' />
          </View>
        );
      }}
    />
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      overflow: 'visible',
    },
    listHeader: {
      paddingHorizontal: 15,
      paddingTop: 10,
      marginBottom: 20,
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerIcon: {
      color: theme.color.primary,
    },
    calender: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingTop: 20,
    },
    day: {
      alignItems: 'center',
    },
    button: {
      width: 100,
    },
    sectionTitle: {
      paddingHorizontal: 20,
      marginBottom: 5,
    },
  });
};
