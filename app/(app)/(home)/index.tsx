import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import WorkoutList from '../../../components/layout/WorkoutList';
import { getPlans } from '../../../firebase/plans';
import { useThemedStyles } from '../../../hooks/useThemedStyles';
import { setPlans } from '../../../redux/planSlice';
import { Theme } from '../../../redux/themeSlice';
import { RootState } from '../../_layout';

export default function DashBoard() {
  const styles = useThemedStyles(createStyles);
  const user = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.userInfo?.uid) {
      getPlans(user.userInfo.uid).then((resp) => {
        dispatch(setPlans(resp));
      });
    }
  }, []);

  return (
    <SafeAreaView edges={['right', 'top', 'left']} style={styles.container}>
      <WorkoutList />
    </SafeAreaView>
  );
}

const createStyles = (theme: Theme) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: theme.color.surface200,
    },
  });
  return styles;
};
