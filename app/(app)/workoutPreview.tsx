import { useRouter, useSearchParams } from 'expo-router';
import { Dimensions, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import IconEdit from '../../assets/icons/IconEdit';
import ThemedButton from '../../components/element/ThemedButton';
import ThemedText from '../../components/element/ThemedText';
import ExerciseContainer from '../../components/layout/ExerciseContainer';
import InfoConatiner from '../../components/layout/InfoContainer';
import ModalHeader from '../../components/layout/ModalHeader';
import { Theme } from '../../redux/themeSlice';
import { setWorkout } from '../../redux/workoutSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import { RootState } from '../_layout';

export default function WorkoutPreview() {
  const plans = useSelector((state: RootState) => state.plans.list);
  const { workoutId, planId } = useSearchParams();
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(themedStyles);
  const router = useRouter();
  const dispatch = useDispatch();

  const workout = plans?.find((p) => p.id === planId)?.workouts.find((w) => w.id === workoutId);

  const isAndroid = Platform.OS === 'android';

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: isAndroid ? insets.top : 0,
        },
      ]}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ModalHeader />
        {workout && (
          <View style={styles.content}>
            <ThemedText
              text={workout?.name}
              size="heading1"
              color="primary"
              weight="bold"
              style={styles.title}
            />
            <View style={styles.infoGroup}>
              <InfoConatiner title="Last Perfomed" content="5 days ago" styles={{ flex: 2 }} />
              <InfoConatiner
                title="Repete On"
                content="Mo, Tu, We, Th, Fr, Sa"
                styles={{ flex: 3 }}
              />
            </View>
            <InfoConatiner title="Traget Muscles" content="#Back #Biceps" />
            <View style={styles.info}>
              <ThemedButton
                type="secondary"
                title="Edit This Workout"
                onPress={() => null}
                icon={<IconEdit width={20} height={20} stroke={styles.icon.color} />}
              />
            </View>
            <View>
              <ThemedText
                text={'Exercises (' + workout.exercises.length + ')'}
                color="text100"
                size="body4"
              />
            </View>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
              return <ExerciseContainer item={workout.exercises[0]} />;
            })}
          </View>
        )}
      </ScrollView>
      <ThemedButton
        title="Start"
        onPress={() => {
          dispatch(setWorkout(workout));
          router.replace({
            pathname: 'WorkoutInProgress',
            params: { title: encodeURIComponent(workout.name) },
          });
        }}
        style={[styles.float, { bottom: insets.bottom ? insets.bottom + 10 : 20 }]}
      />
    </View>
  );
}
const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.color.surface200,
    },
    scroll: {
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingBottom: 100,
    },
    content: {
      width: '100%',
      alignItems: 'stretch',
      gap: 10,
    },
    title: {
      textAlign: 'center',
      marginVertical: 20,
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
    },
    icon: {
      color: theme.color.text300,
    },
  });
};
