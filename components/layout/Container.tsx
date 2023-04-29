import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { Workout } from '../../firebase/plans';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../redux/themeSlice';
import ThemedText from '../element/ThemedText';

interface IProps {
  workouts: Workout;
  index: number;
  onPress: () => void;
}

export default function Container(props: IProps) {
  const { workouts, index, onPress } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View>
      <RectButton style={styles.container} onPress={onPress}>
        <ThemedText
          text={workouts.name}
          size="heading2"
          color="secondary"
          style={styles.title}
          weight="medium"
        />
        <ThemedText text="Last Performed: 5 days ago" color="text100" size="body2" />
        <ThemedText text={`${workouts.exercises.length} Excercises`} color="text100" size="body2" />
        <View style={styles.days}>
          {workouts.days.map((day) => {
            const firstLetter = day.charAt(0);
            const firstLetterCap = firstLetter.toUpperCase();
            const secondLetter = day.charAt(1);
            const capitalized = firstLetterCap + secondLetter;
            return (
              <View key={day} style={styles.day}>
                <ThemedText text={capitalized} color="text200" size="body5" />
              </View>
            );
          })}
        </View>
      </RectButton>
    </View>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.color.surface100,
      borderRadius: theme.borders.borderRadius,
      marginBottom: 10,
      padding: 15,
      marginHorizontal: 15,
    },
    days: {
      flexDirection: 'row',
      gap: 3,
      marginTop: 10,
    },
    day: {
      backgroundColor: theme.color.transprant05,
      width: 24,
      height: 24,
      borderRadius: theme.borders.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      marginBottom: 5,
    },
  });
};
