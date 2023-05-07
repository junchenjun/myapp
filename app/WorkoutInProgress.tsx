import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { BackHandler, StyleSheet } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSelector } from 'react-redux';

import { RootState } from './_layout';
import ExerciseContainer from '../components/layout/ExerciseContainer';
import { Theme } from '../redux/themeSlice';
import { useThemedStyles } from '../utils/hooks/useThemedStyles';

export default function WorkoutInProgress() {
  const styles = useThemedStyles(themedStyles);
  const { workout } = useSelector((state: RootState) => state.workout);
  const router = useRouter();

  useEffect(() => {
    const backAction = () => {
      router.replace('(app)');
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <Animated.ScrollView
      entering={FadeInDown}
      contentContainerStyle={styles.container}
      style={{ backgroundColor: styles.container.backgroundColor }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
        return <ExerciseContainer item={workout?.exercises && workout?.exercises[0]} />;
      })}
    </Animated.ScrollView>
  );
}
const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      alignItems: 'stretch',
      padding: 15,
      paddingTop: 100,
      backgroundColor: theme.color.surface200,
      gap: 10,
    },
    title: {
      fontSize: 64,
      fontWeight: 'bold',
    },
    subtitle: {
      fontSize: 36,
      color: '#38434D',
    },
  });
};
