import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '~components/ThemedText';
import { ITheme } from '~redux/themeSlice';
import { IWorkout } from '~redux/workoutSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

interface IProps {
  workouts: IWorkout;
  index: number;
  onPress: () => void;
}

export const WorkoutContainer = (props: IProps) => {
  const { workouts, onPress } = props;
  const styles = useThemedStyles(themedStyles);
  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: styles.pressable.color,
          borderless: false,
        }}
        style={({ pressed }) => [styles.pressable, pressed && Platform.OS === 'ios' ? { opacity: 0.5 } : {}]}
        onPress={onPress}
      >
        <View style={styles.titleContainer}>
          <ThemedText text={workouts.name} size='heading3' color='text300' style={styles.title} weight='medium' />
        </View>
        <ThemedText text='Last Performed: 5 days ago' color='text100' size='body2' />
        <ThemedText text={`${workouts.exercises.length} Excercises`} color='text100' size='body2' />
        <View style={styles.footer}>
          {workouts?.repeteOn?.map(day => {
            const firstLetter = day.charAt(0);
            const firstLetterCap = firstLetter.toUpperCase();
            const secondLetter = day.charAt(1);
            const capitalized = firstLetterCap + secondLetter;
            return (
              <View key={day} style={styles.day}>
                <ThemedText text={capitalized} color='text200' size='body5' />
              </View>
            );
          })}
        </View>
      </Pressable>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      borderRadius: theme.borders.borderRadius,
      overflow: 'hidden',
      marginHorizontal: 15,
      marginBottom: 10,
    },
    pressable: {
      backgroundColor: theme.color.surface100,
      borderRadius: theme.borders.borderRadius,
      padding: 15,
      overflow: 'hidden',
      color: theme.color.ripple,
    },
    footer: {
      flexDirection: 'row',
      gap: 3,
      marginTop: 10,
    },
    day: {
      backgroundColor: theme.color.surface400,
      width: 24,
      height: 24,
      borderRadius: theme.borders.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    titleIcon: {
      color: theme.color.text100,
    },
    title: {
      marginBottom: 5,
    },
  });
};
