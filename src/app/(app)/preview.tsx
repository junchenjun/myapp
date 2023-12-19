import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback } from 'react';
import { FlatList, Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Label } from '~components/atoms/label/Label';
import { Text } from '~components/atoms/text/Text';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { InfoContainer } from '~components/molecules/infoContainer/InfoContainer';
import { WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { IExercise, setWorkout } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export default function Preview() {
  const plans = useAppSelector(state => state.plans.list);
  const { workoutId, planId } = useLocalSearchParams();
  const styles = useThemedStyles(themedStyles);
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const workout = plans?.find(p => p.id === planId)?.workouts.find(w => w.id === workoutId);
  const labels = ['Back', 'Triceps'];
  const ITEM_HEIGHT = 126;

  const renderItem = useCallback(
    ({ item }: { item: IExercise }) => (
      <WorkoutItem
        style={{ marginTop: styles.gap.marginTop }}
        title={item.name}
        header={{
          labels: ['Shoulder', 'biceps'],
        }}
        descItems={['8 Exercises']}
      />
    ),
    [styles.gap.marginTop]
  );
  return (
    <View style={styles.container}>
      {workout && (
        <Accordion>
          <FlatList
            removeClippedSubviews={Platform.OS === 'android'}
            onScroll={event => {
              const scrolling = event.nativeEvent.contentOffset.y;
              if (scrolling >= 80) {
                navigation.setOptions({ showTitle: true });
              } else {
                navigation.setOptions({ showTitle: false });
              }
            }}
            scrollEventThrottle={16}
            initialNumToRender={8}
            getItemLayout={(_data, index) => ({ length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index })}
            contentContainerStyle={styles.scroll}
            data={workout?.exercises}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.name + index}
            ListHeaderComponent={
              <View style={styles.gap}>
                <Text text={workout?.name} style={styles.title} variant='h2Medium' colorKey='primary' />
                <InfoContainer
                  title='Traget Muscles'
                  content={
                    <View style={styles.labels}>
                      {labels.map(i => (
                        <Label title='Back' key={i} />
                      ))}
                    </View>
                  }
                />
                <InfoContainer title='Last Performed' content='4 days ago' />
                <Text variant='pSMRegular' colorKey='onSurfaceDim' text={`Exercises(${workout.exercises.length}) `} />
              </View>
            }
          />
        </Accordion>
      )}
      <View style={styles.float}>
        <Button
          variant='primary'
          title='Start Workout'
          elevated
          onPress={() => {
            router.replace({
              pathname: 'workout',
              params: { title: workout?.name },
            });
            dispatch(setWorkout(workout));
          }}
          icon={icons.Zap}
        />
      </View>
    </View>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.colors.surfaceExtraDim,
    },
    scroll: {
      paddingHorizontal: theme.spacing[4],
      paddingBottom: 120,
    },
    gap: {
      gap: theme.spacing[3],
      marginTop: theme.spacing[3],
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
    },
    labels: {
      flexDirection: 'row',
      gap: theme.spacing[1],
    },
    float: {
      position: 'absolute',
      right: theme.spacing[4],
      bottom: 25,
    },
  });
};
