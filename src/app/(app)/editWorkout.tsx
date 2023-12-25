import { router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Alert, BackHandler, FlatList, Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Input } from '~components/atoms/input/Input';
import { Text } from '~components/atoms/text/Text';
import { KeyboardSafeView } from '~components/layout/keyboardSafeView/KeyboardSafeView';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { resetWorkoutCreation } from '~redux/workoutCreationSlice';
import { IExercise } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';
import { dismissKeyboardBeforeAction } from '~utils/navigation';

export default function EditWorkout() {
  const [title, setTitle] = useState('');
  const styles = useThemedStyles(themedStyles);

  const dispatch = useAppDispatch();
  const exercises = useAppSelector(state => state.workoutCreation.exercises);

  const exitAlert = useCallback(
    () =>
      Alert.alert(
        'Save This Workout?',
        '',
        [
          {
            text: 'Discard',
            style: 'cancel',
            onPress: () => {
              dispatch(resetWorkoutCreation());
              router.back();
            },
          },
          {
            text: 'Save',
            onPress: () => {
              dispatch(resetWorkoutCreation());
              router.back();
            },
          },
        ],
        {
          cancelable: true,
        }
      ),
    [dispatch]
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (title || exercises?.length) {
          exitAlert();
        } else {
          dispatch(resetWorkoutCreation());
          router.back();
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [dispatch, exercises?.length, exitAlert, title])
  );

  const renderItem = useCallback(
    ({ item }: { item: IExercise }) => (
      <WorkoutItem
        title={item.title}
        header={{
          labels: item.targets,
        }}
        descItems={['8 Exercises']}
        contained
        actionIcon={icons.ExpandRight}
        onActionIconPress={() => null}
        style={styles.item}
      />
    ),
    [styles.item]
  );

  return (
    <KeyboardSafeView>
      <Accordion>
        <FlatList
          removeClippedSubviews={Platform.OS === 'android'}
          scrollEventThrottle={16}
          initialNumToRender={8}
          contentContainerStyle={styles.scroll}
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <Input onChangeValue={setTitle} variant='open' value={title} placeholder='Exercise Title' />
              {!!exercises?.length && (
                <View style={styles.actions}>
                  <Text text='Reorder' variant='pMDRegular' colorKey='primary' />
                </View>
              )}
            </View>
          }
        />
      </Accordion>
      <Button
        alignment='right'
        variant='primary'
        title='Add Exercise'
        float
        onPress={() => dismissKeyboardBeforeAction(() => router.push('findExercise'))}
        icon={icons.Plus}
      />
    </KeyboardSafeView>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    scroll: {
      paddingHorizontal: theme.spacing[4],
      paddingBottom: 120,
    },
    header: {
      justifyContent: 'flex-end',
      paddingVertical: theme.spacing[2],
      paddingTop: theme.spacing[6],
      gap: theme.spacing[6],
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing[1],
    },
    item: {
      marginBottom: theme.spacing[3],
    },
  });
};
