import { StyleSheet, View } from 'react-native';

import { Exercise } from '../../firebase/plans';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../redux/themeSlice';
import ThemedText from '../element/ThemedText';

interface IProps {
  item: Exercise;
}

export default function ExerciseContainer(props: IProps) {
  const { item } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.container]}>
      <View style={styles.image} />
      <View style={styles.content}>
        <ThemedText size="body1" color="text300">
          Push ups
        </ThemedText>
        <ThemedText size="body3" color="text200">
          {item.sets.length + ' Sets'}
        </ThemedText>
      </View>
    </View>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.color.surface100,
      borderRadius: theme.borders.borderRadius,
      padding: 20,
      gap: 10,
    },
    image: {
      height: 55,
      width: 55,
      backgroundColor: theme.color.surface300,
      borderRadius: theme.borders.borderRadius,
    },
    content: {
      justifyContent: 'center',
    },
  });
};
