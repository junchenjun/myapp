import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Alert, BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Button } from '~components/button/Button';
import { ExerciseContainer } from '~components/ExerciseContainer';
import { useAppSelector } from '~redux/store';
import { getFloatButtonDistance } from '~utils/styleHelper';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

const Workout = () => {
  const styles = useThemedStyles(themedStyles);
  const { workout } = useAppSelector(state => state.workout);
  const router = useRouter();

  const createAlert = () =>
    Alert.alert(
      'Leave workout?',
      'You will be able to resume later',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => router.replace('(home)') },
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
      <ScrollView contentContainerStyle={styles.scroll}>
        {workout?.exercises.map((i, index) => {
          return <ExerciseContainer key={index} item={workout?.exercises && workout?.exercises[0]} />;
        })}
        <Button title='Complete Workout' onPress={() => router.back()} />
      </ScrollView>
    </View>
  );
};

export default Workout;

const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: theme.colors.surfaceExtraDim,
    },
    scroll: {
      padding: theme.spacing[4],
      paddingBottom: getFloatButtonDistance(insets),
      gap: theme.spacing[3],
    },
  });
};