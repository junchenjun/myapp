import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { FlatList, StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { icons } from '~assets/icons';
import { Accordion } from '~components/accordion/Accordion';
import { Button } from '~components/button/Button';
import { Icon } from '~components/icon/Icon';
import { InfoContainer } from '~components/InfoContainer';
import { Label } from '~components/label/Label';
import { Text } from '~components/text/Text';
import { WorkoutContainer } from '~components/workoutContainer/WorkoutContainer';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { IExercise, setWorkout } from '~redux/workoutSlice';
import { getFloatButtonDistance } from '~utils/styleHelper';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

export default function Preview() {
  const plans = useAppSelector(state => state.plans.list);
  const { workoutId, planId } = useLocalSearchParams();
  const styles = useThemedStyles(themedStyles);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const workout = plans?.find(p => p.id === planId)?.workouts.find(w => w.id === workoutId);

  const labels = ['Back', 'Triceps'];

  const renderItem = ({ item }: { item: IExercise }) => {
    return (
      <WorkoutContainer
        style={{ marginTop: styles.gap.marginTop }}
        title={item.name}
        header={{
          labels: ['Shoulder', 'biceps'],
        }}
        descItems={['8 Exercises']}
        accordionContent={
          <>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Button title='Log Out' onPress={() => {}} />
            <Button title='Log Out' onPress={() => {}} />
            <Button title='Log Out' onPress={() => {}} />
            <Button title='Log Out' onPress={() => {}} />
            <Button title='Log Out' onPress={() => {}} />
          </>
        }
      />
    );
  };
  return (
    <View style={styles.container}>
      {workout && (
        <Accordion>
          <FlatList
            onScroll={event => {
              const scrolling = event.nativeEvent.contentOffset.y;
              if (scrolling >= 80) {
                navigation.setOptions({ showTitle: true });
              } else {
                navigation.setOptions({ showTitle: false });
              }
            }}
            scrollEventThrottle={16}
            initialNumToRender={7}
            contentContainerStyle={styles.scroll}
            data={workout?.exercises.concat(workout.exercises).concat(workout.exercises).concat(workout.exercises)}
            renderItem={renderItem}
            keyExtractor={(item, index) => item.name + index}
            ListHeaderComponent={
              <View style={styles.gap}>
                <Text text={workout?.name} style={styles.title} variant='h2Medium' color='primary' />
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
                <Text variant='pSMRegular' color='onSurfaceDim' text={`Exercises(${workout.exercises.length}) `} />
              </View>
            }
          />
        </Accordion>
      )}
      <View style={styles.float}>
        <Button
          title='Start Workout'
          elevated
          onPress={() => {
            router.replace({
              pathname: 'workout',
              params: { title: workout?.name },
            });
            dispatch(setWorkout(workout));
          }}
          icon={<Icon icon={icons.zap} color='onPrimary' />}
        />
      </View>
    </View>
  );
}
const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
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
      bottom: getFloatButtonDistance(insets),
    },
  });
};