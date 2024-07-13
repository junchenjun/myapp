import React from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
import { Text } from '~components/atoms/text/Text';
import { IExerciseSet } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IProps extends IExerciseSet {
  index: number;
  onActionClick: () => void;
  exerciseIndex: number;
  setIndex: number;
  setReps: (v: number) => void;
  setWeight: (v: number) => void;
}

export const ExerciseSet = (props: IProps) => {
  const { index, reps, weight, onActionClick, setWeight, setReps } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.container}>
      <Text variant='pLGRegular' colorKey='onSurfaceExtraDim'>
        {index}
      </Text>
      <View style={styles.input}>
        <Input
          maxLength={3}
          inputMode='numeric'
          onChangeValue={v => {
            console.log(111, v);
            setReps(parseInt(v, 10));
          }}
          variant='small'
          placeholder='--'
          value={reps ? reps.toString() : ''}
        />
        <Text variant='pXSRegular' colorKey='onSurfaceExtraDim'>
          Reps
        </Text>
      </View>
      <View style={styles.input}>
        <Input
          maxLength={3}
          inputMode='numeric'
          onChangeValue={v => setWeight(parseInt(v, 10))}
          variant='small'
          placeholder='--'
          value={weight ? weight.toString() : ''}
        />
        <Text variant='pXSRegular' colorKey='onSurfaceExtraDim'>
          Kg
        </Text>
      </View>
      <Icon onPress={onActionClick} colorKey='onSurfaceExtraDim' icon={icons.Remove} />
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: theme.spacing[5],
    },
    input: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: theme.spacing[1],
    },
  });
};
