import { StyleSheet, View } from 'react-native';

import { Card } from '~components/card/Card';
import { Text } from '~components/text/Text';
import { IExercise } from '~redux/workoutSlice';
import { useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  item: IExercise;
}

export const ExerciseContainer = (props: IProps) => {
  const { item } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <Card>
      <View style={styles.content}>
        <Text>Push ups</Text>
        <Text>{item?.sets?.length + ' Sets'}</Text>
      </View>
    </Card>
  );
};

const themedStyles = () => {
  return StyleSheet.create({
    content: {
      justifyContent: 'center',
    },
  });
};
