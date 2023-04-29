import { useRouter } from 'expo-router';
import { SectionList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import Container from './Container';
import ThemedButton from './ThemedButton';
import ThemedText from './ThemedText';
import { RootState } from '../app/_layout';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { Theme } from '../redux/themeSlice';
import { BorderlessButton } from 'react-native-gesture-handler';

const getCurrentDate = () => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date().getDate();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDay();

  return months[month - 1] + ' ' + date + ', ' + days[day];
};

interface IProps {}

export default function WorkoutList(props: IProps) {
  const styles = useThemedStyles(themedStyles);
  const plans = useSelector((state: RootState) => state.plans.list);

  const router = useRouter();

  const sectionData = plans?.map((p) => {
    return { title: p.name, data: p.workouts };
  });

  return sectionData?.length ? (
    <SectionList
      style={styles.container}
      sections={sectionData}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item, index) => item.name + index}
      renderItem={({ item, index }) => <Container workouts={item} index={index} />}
      renderSectionHeader={({ section }) => {
        return (
          <View style={styles.sectionTitle}>
            <ThemedText
              text={section.title + ' (' + section.data.length + ')'}
              color="text100"
              size="body4"
            />
          </View>
        );
      }}
      ListHeaderComponent={() => {
        return (
          <View style={styles.listHeader}>
            <View style={styles.header}>
              <ThemedText
                text={getCurrentDate()}
                size="heading3"
                color="text200"
                weight="regular"
              />
              <View style={styles.button}>
                <ThemedButton
                  type="secondary"
                  title="Create"
                  onPress={() => router.push('./manageWorkouts')}
                />
              </View>
            </View>
            <View style={styles.calender}>
              <BorderlessButton style={styles.day}>
                <ThemedText text="Mo" color="text100" size="body2" />
                <ThemedText text="12" color="text100" size="body2" />
              </BorderlessButton>
              <BorderlessButton style={styles.day}>
                <ThemedText text="Tu" color="text100" size="body2" />
                <ThemedText text="13" color="text100" size="body2" />
              </BorderlessButton>
              <BorderlessButton style={styles.day}>
                <ThemedText text="We" color="text100" size="body2" />
                <ThemedText text="14" color="secondary" size="body2" />
              </BorderlessButton>
              <BorderlessButton style={styles.day}>
                <ThemedText text="Th" color="text100" size="body2" />
                <ThemedText text="15" color="secondary" size="body2" />
              </BorderlessButton>
              <BorderlessButton style={styles.day}>
                <ThemedText text="Fr" color="text100" size="body2" />
                <ThemedText text="16" color="text100" size="body2" />
              </BorderlessButton>
              <BorderlessButton style={styles.day}>
                <ThemedText text="Sa" color="text100" size="body2" />
                <ThemedText text="17" color="text100" size="body2" />
              </BorderlessButton>
              <BorderlessButton style={styles.day}>
                <ThemedText text="Su" color="text100" size="body2" />
                <ThemedText text="18" color="text100" size="body2" />
              </BorderlessButton>
            </View>
          </View>
        );
      }}
    />
  ) : null;
}

const themedStyles = (theme: Theme) => {
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
      width: 90,
    },
    sectionTitle: {
      paddingHorizontal: 20,
      marginBottom: 5,
    },
  });
};
