import { router, useFocusEffect } from 'expo-router';
import { useCallback } from 'react';
import { Alert, BackHandler, FlatList, Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Input } from '~components/atoms/input/Input';
import { Text } from '~components/atoms/text/Text';
import { KeyboardSafeView } from '~components/layout/keyboardSafeView/KeyboardSafeView';
import { Accordion } from '~components/molecules/accordion/Accordion';
import ExerciseSets from '~components/molecules/exerciseSets/ExerciseSets';
import { resetNewWorkout, updateNewWorkoutTitle } from '~redux/newWorkoutSlice';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { IExercise } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';
import { dismissKeyboardBeforeAction } from '~utils/navigation';

export default function EditWorkout() {
  const styles = useThemedStyles(themedStyles);
  const dispatch = useAppDispatch();
  const exercises = useAppSelector(state => state.newWorkout.exercises);
  const title = useAppSelector(state => state.newWorkout.title);

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
              dispatch(resetNewWorkout());
              router.back();
            },
          },
          {
            text: 'Save',
            onPress: () => {
              dispatch(resetNewWorkout());
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
          dispatch(resetNewWorkout());
          router.back();
        }
        return true;
      };
      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => backHandler.remove();
    }, [dispatch, exercises?.length, exitAlert, title])
  );

  const renderItem = useCallback(({ item, index }: { item: IExercise; index: number }) => {
    return <ExerciseSets index={index} item={item} />;
  }, []);

  return (
    <KeyboardSafeView>
      <Accordion expandedIds={exercises?.map((_, index) => index.toString())}>
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={Platform.OS === 'android'}
          scrollEventThrottle={16}
          initialNumToRender={8}
          contentContainerStyle={styles.scroll}
          data={exercises}
          renderItem={renderItem}
          keyExtractor={(_, index) => index.toString()}
          ListHeaderComponent={
            <View style={styles.header}>
              <Input
                onChangeValue={v => dispatch(updateNewWorkoutTitle(v))}
                showMessage
                errorMessage=''
                variant='open'
                value={title}
                placeholder='Exercise Title'
              />
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
        onPress={() => dismissKeyboardBeforeAction(() => router.push('editExercise'))}
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
    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing[3],
    },
  });
};
