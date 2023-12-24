import { router, useFocusEffect, useNavigation } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, BackHandler, FlatList, Keyboard, Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Text } from '~components/atoms/text/Text';
import { KeyboardSafeView } from '~components/layout/keyboardSafeView/KeyboardAwareView';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { IActionPageHeader } from '~components/molecules/pageHeader/PageHeader';
import { WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { resetWorkoutCreation } from '~redux/workoutCreationSlice';
import { IExercise } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export default function EditWorkout() {
  const [title, setTitle] = useState('');
  const styles = useThemedStyles(themedStyles);
  const navigation = useNavigation();

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

  const headerSearchBarOptions = useMemo(() => {
    const options: IActionPageHeader['searchBar'] = {
      onChangeText: (v: string) => setTitle(v),
      placeholder: 'Name for the workout',
      value: title,
    };
    return options;
  }, [title]);

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions,
    });
  }, [headerSearchBarOptions, navigation]);

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
      {exercises && (
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
              exercises.length ? (
                <View style={styles.header}>
                  <Text text='Reorder' variant='pMDRegular' colorKey='primary' />
                  <Text variant='pMDRegular' colorKey='onSurfaceDim' text={`Exercises(${exercises.length}) `} />
                </View>
              ) : undefined
            }
          />
        </Accordion>
      )}
      <Button
        variant='primary'
        title='Add Exercise'
        float
        onPress={() => {
          Keyboard.dismiss();
          router.push('findExercise');
        }}
        icon={icons.Plus}
      />
    </KeyboardSafeView>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    scroll: {
      flex: 1,
      paddingHorizontal: theme.spacing[4],
      paddingBottom: 120,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing[2],
    },
    item: {
      marginBottom: theme.spacing[3],
    },
  });
};
