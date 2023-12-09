import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { ScrollView, SectionList, StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Text } from '~components/text/Text';
import { WorkoutContainer } from '~components/WorkoutContainer';
import { useAppSelector } from '~redux/store';
import { getCurrentDateMDW } from '~utils/dateHelper';
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
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <ScrollView>
        <View style={styles.listHeader}>
          <View style={styles.header}>
            <Text text={getCurrentDateMDW()} />
          </View>
        </View>
        <Suspense fallback={<View />}>
          <SectionList
            style={styles.list}
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
                  <Text text={section.title + ' (' + section.data.length + ')'} />
                </View>
              );
            }}
          />
        </Suspense>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const createStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surfaceExtraDim,
      width: '100%',
      overflow: 'visible',
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
    listHeader: {
      paddingHorizontal: 15,
      paddingTop: 10,
      marginBottom: 20,
    },
    header: {
      width: '100%',
      paddingLeft: 9,
    },
    list: {
      flex: 1,
      overflow: 'hidden',
      marginHorizontal: 15,
    },
    sectionTitle: {
      paddingHorizontal: 20,
      marginBottom: 5,
    },
  });
};
