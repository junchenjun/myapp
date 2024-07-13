import { useTranslation } from 'react-i18next';
import { FlatList, Platform, StyleSheet, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Icon } from '~components/atoms/icon/Icon';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { ExerciseSet } from '~components/molecules/exerciseSet/ExerciseSet';
import { WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';
import { addSetToNewExercise, removeSetFromNewExercise, updateSetReps, updateSetWeight } from '~redux/newWorkoutSlice';
import { useAppDispatch } from '~redux/store';
import { IExercise, IExerciseSet } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IProps {
  index: number;
  item: IExercise;
}

export default function ExerciseSets(props: IProps) {
  const { index, item } = props;

  const styles = useThemedStyles(themedStyles);
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  return (
    <Accordion.Item key={index} style={styles.item} id={index.toString()}>
      <Accordion.Trigger>
        {({ open, toggle }) => (
          <WorkoutItem
            title={item.title}
            header={{
              labels: item.targets.map(i => t(i)),
            }}
            descItems={[`${item.sets.length} Sets`]}
            onActionIconPress={toggle}
            actionIcon={open ? icons.ExpandUp : icons.ExpandDown}
          />
        )}
      </Accordion.Trigger>
      <Accordion.Content>
        <FlatList
          keyboardShouldPersistTaps='handled'
          removeClippedSubviews={Platform.OS === 'android'}
          data={item.sets}
          renderItem={({ item: setItem, index: setIndex }: { item: IExerciseSet; index: number }) => {
            return (
              <Animated.View key={setIndex} entering={FadeIn}>
                <ExerciseSet
                  setIndex={setIndex}
                  exerciseIndex={index}
                  onActionClick={() => {
                    dispatch(removeSetFromNewExercise({ exerciseIndex: index, setIndex }));
                  }}
                  index={setIndex + 1}
                  reps={setItem.reps}
                  weight={setItem.weight}
                  setReps={(v: number) => {
                    dispatch(updateSetReps({ exerciseIndex: index, setIndex, reps: v }));
                  }}
                  setWeight={(v: number) => {
                    dispatch(updateSetWeight({ exerciseIndex: index, setIndex, weight: v }));
                  }}
                />
              </Animated.View>
            );
          }}
          keyExtractor={(_, index) => index.toString()}
        />

        <View style={styles.buttons}>
          <Icon onPress={() => {}} colorKey='onSurfaceExtraDim' icon={icons.Trash} />
          <Button
            variant='ghost'
            title='Add Set'
            onPress={() => {
              dispatch(addSetToNewExercise(index));
            }}
            icon={icons.Plus}
            withPaddings={false}
          />
        </View>
      </Accordion.Content>
    </Accordion.Item>
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
