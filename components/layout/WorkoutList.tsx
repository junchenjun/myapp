import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { SectionList, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Container from './Container';
import { RootState } from '../../app/_layout';
import { fetchPlansData } from '../../firebase/plans';
import { setPlans } from '../../redux/planSlice';
import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import ThemedText from '../element/ThemedText';

const plansResource = fetchPlansData();

interface IProps {}

export default function WorkoutList(props: IProps) {
  const styles = useThemedStyles(themedStyles);
  const planList = useSelector((state: RootState) => state.plans.list);
  const user = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const [openedMenu, setOpenMenu] = useState('');

  const plans = user?.userInfo?.uid ? plansResource.read(user?.userInfo?.uid) : [];

  useEffect(() => {
    dispatch(setPlans(plans));
  }, [plans]);

  const sectionData =
    planList?.map((p) => {
      return { title: p.name, data: p.workouts, id: p.id };
    }) || [];

  return (
    <SectionList
      style={styles.container}
      sections={sectionData}
      stickySectionHeadersEnabled={false}
      keyExtractor={(item, index) => item.name + index}
      scrollEnabled={false}
      renderItem={({ item, section, index }) => (
        <Container
          onPress={() => {
            return router.push({
              pathname: 'workoutPreview',
              params: { planId: section.id, workoutId: item.id },
            });
          }}
          workouts={item}
          index={index}
          openedMenu={openedMenu}
          setOpenMenu={setOpenMenu}
        />
      )}
      renderSectionHeader={({ section }) => {
        return (
          <View style={styles.sectionTitle}>
            <ThemedText
              text={section.title + ' (' + section.data.length + ')'}
              color="text100"
              size="body4"
            />
          </View>
        );
      }}
    />
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      overflow: 'visible',
    },
    listHeader: {
      paddingHorizontal: 15,
      paddingTop: 10,
      marginBottom: 20,
    },
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerIcon: {
      color: theme.color.primary,
    },
    calender: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 15,
      paddingTop: 20,
    },
    day: {
      alignItems: 'center',
    },
    button: {
      width: 100,
    },
    sectionTitle: {
      paddingHorizontal: 20,
      marginBottom: 5,
    },
  });
};
