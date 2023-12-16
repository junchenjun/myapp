import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { router } from 'expo-router';
import { Suspense, useCallback, useRef } from 'react';
import { Alert, ScrollView, SectionList, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/menuItem/MenuItem';
import { Modal } from '~components/modal/Modal';
import { WorkoutContainer } from '~components/workoutContainer/WorkoutContainer';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

const Home = () => {
  const styles = useThemedStyles(createStyles);
  const planList = useAppSelector(state => state.plans.list);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const sectionData =
    planList?.map(p => {
      return { title: p.name, data: p.workouts, id: p.id };
    }) || [];

  const createAlert = () =>
    Alert.alert(
      'Leave workout?',
      'You will be able to resume later',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => null },
      ],
      {
        cancelable: true,
      }
    );

  return (
    <>
      <Modal bottomSheetModalRef={bottomSheetModalRef} backgroundColor='surface'>
        <View style={styles.content}>
          <MenuItem iconLeft={icons.Edit} roundedBottomCorners roundedTopCorners title='New Workout Plan' />
          <MenuItem iconLeft={icons.Switch} roundedBottomCorners roundedTopCorners title='New Workout Plan' />
          <MenuItem
            danger
            iconLeft={icons.Trash}
            onPress={createAlert}
            roundedBottomCorners
            roundedTopCorners
            title='Delete Current Plan'
          />
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Suspense fallback={<View />}>
          <SectionList
            style={styles.list}
            sections={sectionData}
            stickySectionHeadersEnabled={false}
            keyExtractor={(item, index) => item.name + index}
            scrollEnabled={false}
            contentContainerStyle={{ ...styles.gap }}
            renderItem={({ item, section, index }) => (
              <WorkoutContainer
                key={index}
                title={item.name}
                header={{
                  labels: ['Shoulder', 'biceps'],
                  onPress: handlePresentModalPress,
                }}
                onPress={() => {
                  return router.push({
                    pathname: 'preview',
                    params: { planId: section.id, workoutId: item.id, title: item?.name },
                  });
                }}
                descItems={[`${item.exercises.length} Exercises`, '5 days ago']}
              />
            )}
          />
        </Suspense>
      </ScrollView>
    </>
  );
};

export default Home;

const createStyles = (theme: ITheme) => {
  return StyleSheet.create({
    scroll: {
      flex: 1,
      backgroundColor: theme.colors.surfaceExtraDim,
      paddingHorizontal: theme.spacing[4],
    },
    gap: {
      gap: theme.spacing[3],
    },
    list: {
      flex: 1,
      overflow: 'hidden',
    },
    content: {
      gap: theme.spacing[2],
    },
  });
};
