import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { LayoutChangeEvent, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Card } from '~components/atoms/card/Card';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
import { Label } from '~components/atoms/label/Label';
import { Text } from '~components/atoms/text/Text';
import { KeyboardSafeView } from '~components/layout/keyboardSafeView/KeyboardSafeView';
import { TargetMusclesModal } from '~components/organisms/targetMusclesModal/TargetMusclesModal';
import { useAppDispatch } from '~redux/store';
import { createExercise } from '~redux/workoutCreationSlice';
import { IExercise, IMuscleTarget } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export default function EditExercise() {
  const [title, setTile] = useState('');
  const [targets, setTargets] = useState<IMuscleTarget[]>(['fullBody']);
  const [scrollTo, setScrollTo] = useState(0);
  const enableScrollTo = Platform.OS === 'ios';

  const styles = useThemedStyles(themedStyles);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const ref = useRef<ScrollView>(null);
  const targetsModalRef = useRef<BottomSheetModal>(null);

  // ios only
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.y;
    setScrollTo(Math.round(onLayoutHeight));
  }, []);

  const onTargetsPress = useCallback(() => {
    targetsModalRef.current?.present();
  }, []);

  const formValues: IExercise = {
    title,
    targets,
  };

  return (
    <KeyboardSafeView>
      <TargetMusclesModal modalRef={targetsModalRef} targets={targets} setTargets={setTargets} />
      <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Card style={styles.card}>
          <View style={[styles.item, styles.topItem]}>
            <Text>Title</Text>
            <Input value={title} onChangeValue={setTile} placeholder='Exercise Title' showMessage={false} />
          </View>
          <View style={[styles.item, styles.scrollable]}>
            <View style={[styles.itemTitle, styles.scrollableTitle]}>
              <Text>Target Muscle</Text>
              <Icon onPress={onTargetsPress} colorKey='primary' icon={icons.Config} />
            </View>
            <ScrollView
              bounces={false}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.labels}
            >
              {targets.map(i => (
                <Label title={i} key={i} />
              ))}
            </ScrollView>
          </View>
          <View style={styles.item}>
            <View style={styles.itemTitle}>
              <Text>Rest Timer</Text>
              <View style={styles.iconWrapper}>
                <Text colorKey='primary'>50s</Text>
                <Icon colorKey='primary' icon={icons.ExpandRight} />
              </View>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemTitle}>
              <Text>Exercise Link</Text>
              <Icon colorKey='primary' icon={icons.Plus} />
            </View>
          </View>
          <View style={[styles.item, styles.bottomItem]} onLayout={enableScrollTo ? onLayout : undefined}>
            <Text>Exercise Notes</Text>
            <Input
              onFocus={() => {
                enableScrollTo &&
                  setTimeout(() => {
                    ref.current?.scrollTo({ y: scrollTo });
                  }, 150);
              }}
              multiline
              placeholder='Exercise Notes'
              showMessage={false}
            />
          </View>
        </Card>
      </ScrollView>
      <Button
        float
        alignment='right'
        variant='primary'
        title='Add To Workout'
        disabled={!title}
        onPress={() => {
          dispatch(createExercise(formValues));
          navigation.dispatch(StackActions.pop(2));
        }}
        icon={icons.Plus}
      />
    </KeyboardSafeView>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    card: {
      paddingHorizontal: 0,
    },
    scroll: {
      paddingHorizontal: theme.spacing[4],
      paddingBottom: 120,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing[1],
    },
    item: {
      paddingHorizontal: theme.spacing[5],
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[5],
      borderBottomWidth: 1,
      borderColor: theme.colors.outlineExtraDim,
    },
    scrollable: {
      paddingRight: 0,
      gap: theme.spacing[4],
    },
    scrollableTitle: {
      paddingRight: theme.spacing[5],
    },
    labels: {
      flexDirection: 'row',
      gap: theme.spacing[1],
      paddingRight: theme.spacing[1],
    },
    topItem: {
      paddingTop: 0,
    },
    iconWrapper: {
      flexDirection: 'row',
    },
    itemTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    bottomItem: {
      borderBottomWidth: 0,
    },
  });
};
