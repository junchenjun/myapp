import { useLocalSearchParams, useRouter } from 'expo-router';
import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Accordion } from '~components/accordion/Accordion';
import { AccordionItem } from '~components/accordion/accordionItem/AccordionItem';
import { Button } from '~components/button/Button';
import { InfoConatiner } from '~components/InfoContainer';
import { Text } from '~components/text/Text';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { setWorkout } from '~redux/workoutSlice';
import { getFloatButtonDistance, getPagePaddingTopWithHeader } from '~utils/styleHelper';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

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
            <Text text={workout?.name} size='heading1' weight='bold' style={styles.title} />
            <View style={styles.infoGroup}>
              <InfoConatiner title='Last Perfomed' content={workout.lastPerformed} styles={{ flex: 2 }} />
              <InfoConatiner title='Repete On' content='Mo, Tu, We, Th, Fr, Sa' styles={{ flex: 3 }} />
            </View>
            <InfoConatiner title='Traget Muscles' content='#Back #Biceps' />
            <View>
              <Text text={'Exercises (' + workout.exercises.length + ')'} color='text100' size='body4' />
            </View>
            <Accordion style={styles.accordion}>
              {workout.exercises.map((i, index) => {
                return (
                  <View key={index}>
                    <AccordionItem
                      id={index.toString()}
                      header={
                        <>
                          <Text size='body1' color='text300'>
                            Push ups
                          </Text>
                          <Text size='body3' color='text100'>
                            content content content content content content content
                          </Text>
                        </>
                      }
                    >
                      <Text>content content content content content content content</Text>
                      <Text>content content content content content content content</Text>
                      <Text>content content content content content content content</Text>
                      <Text>content content content content content content content</Text>
                      <Text>content content content content content content content</Text>
                      <Text>content content content content content content content</Text>
                      <Text>content content content content content content content</Text>
                    </AccordionItem>
                  </View>
                );
              })}
            </Accordion>
          </View>
        )}
      </ScrollView>
      <View style={styles.float}>
        <Button
          title='Start'
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
      backgroundColor: theme.colors.surface200,
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
      left: 15,
      width: Dimensions.get('window').width - 15 * 2,
      bottom: getFloatButtonDistance(insets),
    },
  });
};
