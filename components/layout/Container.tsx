import { Pressable, StyleSheet, View } from 'react-native';

import PopUpMenu from './PopUpMenu';
import { Workout } from '../../firebase/plans';
import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import ThemedText from '../element/ThemedText';

interface IProps {
  workouts: Workout;
  index: number;
  onPress: () => void;
  openedMenu: string;
  setOpenMenu: any;
}

export default function Container(props: IProps) {
  const { workouts, index, onPress, openedMenu, setOpenMenu } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.container}>
      <Pressable
        android_ripple={{
          color: styles.pressable.color,
          borderless: false,
        }}
        style={styles.pressable}
        onPress={onPress}>
        <View style={styles.titleContainer}>
          <ThemedText
            text={workouts.name}
            size="heading2"
            color="text300"
            style={styles.title}
            weight="medium"
          />
          <PopUpMenu openedMenu={openedMenu} setOpenMenu={setOpenMenu} name={workouts.id} />
        </View>
        <ThemedText text="Last Performed: 5 days ago" color="text100" size="body2" />
        <ThemedText text={`${workouts.exercises.length} Excercises`} color="text100" size="body2" />
        <View style={styles.footer}>
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
      </Pressable>
    </View>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      borderRadius: 10,
      overflow: 'hidden',
      marginHorizontal: 15,
      marginBottom: 10,
    },
    pressable: {
      backgroundColor: theme.color.surface100,
      borderRadius: theme.borders.borderRadius,
      padding: 15,
      overflow: 'hidden',
      color: theme.color.text100,
    },
    footer: {
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
