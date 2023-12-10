import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { IconZap } from '~assets/icons';
import { Accordion } from '~components/accordion/Accordion';
import { Button } from '~components/button/Button';
import { InfoConatiner } from '~components/InfoContainer';
import { Text } from '~components/text/Text';
import { WorkoutContainer } from '~components/workoutContainer/WorkoutContainer';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { setWorkout } from '~redux/workoutSlice';
import { getFloatButtonDistance } from '~utils/styleHelper';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

export default function Preview() {
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
            <Text text={workout?.name} style={styles.title} type='h2Medium' color='primary' />
            <View style={styles.infoGroup}>
              <InfoConatiner title='Last Perfomed' content={workout.lastPerformed} styles={{ flex: 2 }} />
              <InfoConatiner title='Repete On' content='Mo, Tu, We, Th, Fr, Sa' styles={{ flex: 3 }} />
            </View>
            <InfoConatiner title='Traget Muscles' content='#Back #Biceps' />
            <View>
              <Text text={'Exercises (' + workout.exercises.length + ')'} />
            </View>
            <Accordion style={styles.accordion}>
              {workout.exercises.map((i, index) => {
                return (
                  <WorkoutContainer
                    key={index}
                    title={i.name}
                    header={{
                      labels: ['Shoulder', 'biceps'],
                    }}
                    descItems={['8 Exercises']}
                    accordionItem={
                      <>
                        <Text>content content content content content content content</Text>
                        <Text>content content content content content content content</Text>
                        <Text>content content content content content content content</Text>
                        <Text>content content content content content content content</Text>
                        <Text>content content content content content content content</Text>
                        <Text>content content content content content content content</Text>
                        <Text>content content content content content content content</Text>
                      </>
                    }
                  />
                );
              })}
            </Accordion>
          </View>
        )}
      </ScrollView>
      <View style={styles.float}>
        <Button
          title='Start Workout'
          onPress={() => {
            router.replace({
              pathname: 'workout',
              params: { title: workout?.name },
            });
            dispatch(setWorkout(workout));
          }}
          icon={IconZap}
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
    content: {
      width: '100%',
      alignItems: 'stretch',
      gap: 10,
    },
    accordion: {
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
    float: {
      position: 'absolute',
      right: theme.spacing[4],
      bottom: getFloatButtonDistance(insets),
    },
  });
};
