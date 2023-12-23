import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Card } from '~components/atoms/card/Card';
import { Input } from '~components/atoms/input/Input';
import { Label } from '~components/atoms/label/Label';
import { Text } from '~components/atoms/text/Text';
import { KeyboardAwareView } from '~components/layout/keyboardAwareView/KeyboardAwareView';
import { IExerciseForm, addExercise } from '~redux/createWorkoutSlice';
import { useAppDispatch } from '~redux/store';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

// type IMuscleTarget =
//   | 'fullBody'
//   | 'other'
//   | 'arms'
//   | 'biceps'
//   | 'triceps'
//   | 'forearms'
//   | 'back'
//   | 'lats'
//   | 'midBack'
//   | 'lowerBack'
//   | 'lowerChest'
//   | 'upperChest'
//   | 'midChest'
//   | 'core'
//   | 'obliques'
//   | 'legs'
//   | 'glutes'
//   | 'hamstrings'
//   | 'calves'
//   | 'quads'
//   | 'hips'
//   | 'shoulders'
//   | 'traps'
//   | 'chest';

// const targetMuscles: { group: IMuscleTarget; subs: IMuscleTarget[] }[] = [
//   {
//     group: 'fullBody',
//     subs: ['other'],
//   },
//   {
//     group: 'arms',
//     subs: ['biceps', 'triceps', 'forearms'],
//   },
//   {
//     group: 'back',
//     subs: ['lats', 'midBack', 'lowerBack'],
//   },
//   {
//     group: 'chest',
//     subs: ['lowerChest', 'upperChest', 'midChest'],
//   },
//   {
//     group: 'core',
//     subs: ['obliques'],
//   },
//   {
//     group: 'shoulders',
//     subs: ['traps'],
//   },
//   {
//     group: 'legs',
//     subs: ['glutes', 'hamstrings', 'calves', 'quads', 'hips'],
//   },
// ];

export default function EditExercise() {
  const [title, setTile] = useState('');
  // const [targets, setTargets] = useState<IMuscleTarget>();

  const styles = useThemedStyles(themedStyles);
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const formValues: IExerciseForm = {
    title,
    targets: ['fullBody'],
  };

  return (
    <KeyboardAwareView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Card>
          <View style={styles.item}>
            <Text>Title</Text>
            <Input value={title} onChangeValue={setTile} placeholder='Exercise Title' showMessage={false} />
          </View>
          <View style={styles.item}>
            <Text>Target Muscle Groups</Text>
            <View>
              <Label title='Full Body' />
            </View>
          </View>
          <View style={styles.item}>
            <Text>Rest Timer</Text>
            <Input showMessage={false} />
          </View>
          <View style={styles.item}>
            <Text>Exercise Link</Text>
            <Input showMessage={false} />
          </View>
          <View style={[styles.item, styles.withoutBorder]}>
            <Text>Exercise Notes</Text>
            <Input showMessage={false} />
          </View>
        </Card>
      </ScrollView>
      <Button
        variant='primary'
        title='Add To Workout'
        disabled={!title}
        float
        onPress={() => {
          dispatch(addExercise(formValues));
          navigation.dispatch(StackActions.pop(2));
        }}
        icon={icons.Plus}
      />
    </KeyboardAwareView>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    scroll: {
      paddingHorizontal: theme.spacing[4],
      paddingBottom: 120,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing[1],
    },
    item: {
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[5],
      borderBottomWidth: 1,
      borderColor: theme.colors.outlineExtraDim,
    },
    withoutBorder: {
      borderBottomWidth: 0,
    },
  });
};
