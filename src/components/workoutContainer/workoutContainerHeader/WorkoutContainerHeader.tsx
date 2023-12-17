import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Label } from '~components/label/Label';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export interface IWorkoutContainerHeader {
  onPress?: () => void;
  labels?: string[];
}

export const WorkoutContainerHeader = (props: IWorkoutContainerHeader) => {
  const { onPress, labels } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.container}>
      <View style={styles.labels}>
        {labels?.map(i => (
          <Label title={i} key={i} />
        ))}
      </View>
      {onPress && <Icon icon={icons.More} onPress={onPress} color='onSurface' fill='onSurface' />}
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    labels: {
      flexDirection: 'row',
      gap: theme.spacing[1],
    },
  });
};
