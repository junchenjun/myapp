import { StyleSheet, View } from 'react-native';

import { ThemedText } from '~components/ThemedText';
import { ITheme } from '~redux/themeSlice';
import { IExercise } from '~redux/workoutSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

interface IProps {
  item: IExercise;
}

export const ExerciseContainer = (props: IProps) => {
  const { item } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.container]}>
      {/* <View style={styles.imageBox}>
        <Image
          style={styles.image}
          source="http://d205bpvrqc9yn1.cloudfront.net/0001.gif"
          contentFit="cover"
          cachePolicy="memory-disk"
        />
      </View> */}
      <View style={styles.content}>
        <ThemedText size='body1' color='text300'>
          Push ups
        </ThemedText>
        <ThemedText size='body3' color='text100'>
          {item?.sets?.length + ' Sets'}
        </ThemedText>
      </View>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: theme.color.surface100,
      borderRadius: theme.borders.borderRadius,
      padding: 20,
      gap: 10,
    },
    imageBox: {
      backgroundColor: theme.color.surface300,
      borderRadius: theme.borders.borderRadius,
      overflow: 'hidden',
      borderWidth: 1,
    },
    content: {
      justifyContent: 'center',
    },
  });
};
