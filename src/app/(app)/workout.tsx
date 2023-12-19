import { router } from 'expo-router';
import { useEffect } from 'react';
import { Alert, BackHandler, ScrollView, StyleSheet, View } from 'react-native';

import { Button } from '~components/atoms/button/Button';
import { Text } from '~components/atoms/text/Text';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

const Workout = () => {
  const styles = useThemedStyles(themedStyles);
  const { workout } = useAppSelector(state => state.workout);

  const createAlert = () =>
    Alert.alert(
      'Leave workout?',
      'You will be able to resume later',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => router.back() },
      ],
      {
        cancelable: true,
      }
    );

  useEffect(() => {
    const backAction = () => {
      createAlert();
      return true;
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Accordion>
        <ScrollView contentContainerStyle={styles.scroll}>
          {workout?.exercises.map((i, index) => {
            return (
              <WorkoutItem
                key={index}
                title={i.name}
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
                    <Button title='Log Out' variant='primary' onPress={() => {}} />
                  </>
                }
              />
            );
          })}
          <Button title='Complete Workout' variant='primary' onPress={() => router.back()} />
        </ScrollView>
      </Accordion>
    </View>
  );
};

export default Workout;

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.colors.surfaceExtraDim,
    },
    scroll: {
      padding: theme.spacing[4],
      paddingBottom: 20,
      gap: theme.spacing[3],
    },
  });
};
