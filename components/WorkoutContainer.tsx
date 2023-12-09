import { StyleSheet, View } from 'react-native';

import { Card } from '~components/card/Card';
import { Text } from '~components/text/Text';
import { IWorkout } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  workouts: IWorkout;
  index: number;
  onPress: () => void;
}

export const WorkoutContainer = (props: IProps) => {
  const { workouts, onPress } = props;
  const styles = useThemedStyles(themedStyles);
  return (
    <Card onPress={onPress} style={styles.container}>
      <View style={styles.titleContainer}>
        <Text text={workouts.name} style={styles.title} />
      </View>
      <Text text='Last Performed: 5 days ago' />
      <Text text={`${workouts.exercises.length} Excercises`} />
      {/* <View style={styles.footer}>
        {workouts?.repeteOn?.map(day => {
          const firstLetter = day.charAt(0);
          const firstLetterCap = firstLetter.toUpperCase();
          const secondLetter = day.charAt(1);
          const capitalized = firstLetterCap + secondLetter;
          return (
            <View key={day} style={styles.day}>
              <Text text={capitalized} color='text200' size='body5' />
            </View>
          );
        })}
      </View> */}
    </Card>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    footer: {
      flexDirection: 'row',
      gap: 3,
      marginTop: 10,
    },
    day: {
      backgroundColor: theme.colors.onSurface,
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleIcon: {
      color: theme.colors.onSurfaceDim,
    },
    title: {
      marginBottom: 5,
    },
  });
};
