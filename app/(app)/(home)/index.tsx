import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import ThemedButton from '../../../components/ThemedButton';
import ThemedText from '../../../components/ThemedText';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { Theme } from '../../../redux/themeSlice';

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

export default function DashBoard() {
  const styles = useThemedStyles(createStyles);

  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.welcome}>
        <ThemedText text={getCurrentDate()} size="heading2" />
        <View style={styles.button}>
          <ThemedButton
            type="secondary"
            title="Manage"
            onPress={() => router.push('./manageWorkouts')}
          />
        </View>
      </View>
      <ThemedButton type="primary" title="Start" onPress={() => router.push('./workoutPreview')} />
    </View>
  );
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 15,
      backgroundColor: theme.color.surface300,
    },
    welcome: {
      width: '100%',
      marginVertical: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    button: {
      width: 100,
    },
  });
  return styles;
};
