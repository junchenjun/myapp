import { useRouter } from 'expo-router';
import { Suspense } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import IconAdd from '../../../assets/icons/IconAdd';
import ThemedButton from '../../../components/element/ThemedButton';
import ThemedText from '../../../components/element/ThemedText';
import WorkoutList from '../../../components/layout/WorkoutList';
import { Theme } from '../../../redux/themeSlice';
import { currentDateMDW } from '../../../utils/dateHelper';
import { useThemedStyles } from '../../../utils/hooks/useThemedStyles';

export default function DashBoard() {
  const styles = useThemedStyles(createStyles);
  const router = useRouter();

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <ScrollView>
        <View style={styles.listHeader}>
          <View style={styles.header}>
            <ThemedText text={currentDateMDW} size="heading3" color="text200" weight="regular" />
            <View style={styles.button}>
              <ThemedButton
                type="secondary"
                title="Create"
                size="short"
                onPress={() => router.push('./manageWorkouts')}
                icon={<IconAdd width={16} height={16} stroke={styles.headerIcon.color} />}
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
              <ThemedText text="14" color="primary" size="body2" />
            </BorderlessButton>
            <BorderlessButton style={styles.day}>
              <ThemedText text="Th" color="text100" size="body2" />
              <ThemedText text="15" color="primary" size="body2" />
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
        <Suspense fallback={<View />}>
          <WorkoutList />
        </Suspense>
      </ScrollView>
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.surface200,
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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerIcon: {
      color: theme.color.text100,
    },
    button: {
      width: 100,
    },
  });
  return styles;
};
