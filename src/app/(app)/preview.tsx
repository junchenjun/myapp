import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { ExerciseContainer } from '~components/ExerciseContainer';
import { InfoConatiner } from '~components/InfoContainer';
import { ThemedButton } from '~components/ThemedButton';
import { ThemedText } from '~components/ThemedText';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { ITheme } from '~redux/themeSlice';
import { setWorkout } from '~redux/workoutSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';
import { getFloatButtonDistance, getPagePaddingTopWithHeader } from '~utils/styleHelper';

export default function WorkoutPreview() {
  const plans = useAppSelector(state => state.plans.list);
  const { workoutId, planId } = useLocalSearchParams();
  const styles = useThemedStyles(themedStyles);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const workout = plans?.find(p => p.id === planId)?.workouts.find(w => w.id === workoutId);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {workout && (
          <View style={styles.content}>
            <ThemedText text={workout?.name} size='heading1' weight='bold' style={styles.title} />
            <View style={styles.infoGroup}>
              <InfoConatiner title='Last Perfomed' content={workout.lastPerformed} styles={{ flex: 2 }} />
              <InfoConatiner title='Repete On' content='Mo, Tu, We, Th, Fr, Sa' styles={{ flex: 3 }} />
            </View>
            <InfoConatiner title='Traget Muscles' content='#Back #Biceps' />
            <View>
              <ThemedText text={'Exercises (' + workout.exercises.length + ')'} color='text100' size='body4' />
            </View>
            {workout.exercises.map((i, index) => {
              return <ExerciseContainer key={index} item={i} />;
            })}
          </View>
        )}
      </ScrollView>
      <View style={styles.float}>
        <ThemedButton
          title='Start'
          float
          onPress={() => {
            router.replace({
              pathname: 'workout',
              params: { title: workout?.name },
            });
            dispatch(setWorkout(workout));
          }}
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
      backgroundColor: theme.color.surface200,
    },
    scroll: {
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingBottom: 120,
      paddingTop: getPagePaddingTopWithHeader(insets),
    },
    content: {
      width: '100%',
      alignItems: 'stretch',
      gap: 10,
    },
    title: {
      textAlign: 'center',
      marginBottom: 20,
    },
    infoGroup: {
      flexDirection: 'row',
      gap: 10,
    },
    info: {},
    float: {
      position: 'absolute',
      left: 15,
      width: Dimensions.get('window').width - 15 * 2,
      bottom: getFloatButtonDistance(insets),
    },
    icon: {
      color: theme.color.primary,
    },
  });
};
