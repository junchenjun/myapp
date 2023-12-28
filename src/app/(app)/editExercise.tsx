import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, LayoutChangeEvent, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Card } from '~components/atoms/card/Card';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
import { Label } from '~components/atoms/label/Label';
import { Modal } from '~components/atoms/modal/Modal';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import { KeyboardSafeView } from '~components/layout/keyboardSafeView/KeyboardSafeView';
import { RestTimer } from '~components/organisms/restTimer/RestTimer';
import { TargetMusclesModal } from '~components/organisms/targetMusclesModal/TargetMusclesModal';
import { useAppDispatch } from '~redux/store';
import { createExercise } from '~redux/workoutCreationSlice';
import { IExercise, IMuscleTarget } from '~redux/workoutSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';
import { getTimerInfoBySeconds } from '~utils/dateTime';
import { dismissKeyboardBeforeAction } from '~utils/navigation';

export default function EditExercise() {
  const [title, setTile] = useState('');
  const [restTime, setRestTime] = useState(20);
  const [targets, setTargets] = useState<IMuscleTarget[]>([]);
  const [scrollTo, setScrollTo] = useState(0);

  const styles = useThemedStyles(themedStyles);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const ref = useRef<ScrollView>(null);
  const targetsModalRef = useRef<BottomSheetModal>(null);
  const restTimerModalRef = useRef<BottomSheetModal>(null);

  // ios only
  const enableScrollTo = Platform.OS === 'ios';
  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.y;
    setScrollTo(Math.round(onLayoutHeight));
  }, []);

  const onTargetsPress = useCallback(() => {
    targetsModalRef.current?.present();
  }, []);
  const onRestTimerPress = useCallback(() => {
    restTimerModalRef.current?.present();
  }, []);

  const titleRequiredAlert = useCallback(
    () =>
      Alert.alert('Exercise Title is required', '', [{ text: 'OK' }], {
        cancelable: true,
      }),
    []
  );
  const targetsRequiredAlert = useCallback(
    () =>
      Alert.alert('At least 1 target muscle is required', '', [{ text: 'OK' }], {
        cancelable: true,
      }),
    []
  );
  const restTimeInfo = getTimerInfoBySeconds(restTime);

  const formValues: IExercise = {
    title,
    targets,
    restTime,
  };

  return (
    <KeyboardSafeView>
      <TargetMusclesModal modalRef={targetsModalRef} targets={targets} setTargets={setTargets} />
      <Modal autoDismissKeyboard={false} modalRef={restTimerModalRef} title={t('restTimer')}>
        <RestTimer
          timer={restTime}
          setTimer={v => {
            setRestTime(v);
            restTimerModalRef.current?.dismiss();
          }}
        />
      </Modal>
      <ScrollView ref={ref} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Card>
          <View style={[styles.item, styles.topItem]}>
            <Input variant='open' value={title} onChangeValue={setTile} placeholder='Exercise Title*' />
          </View>
          <View style={[styles.item, styles.targets]}>
            <View style={[styles.itemTitle]}>
              <Text variant='pMDRegular' colorKey='onSurfaceDim'>
                {t('targetMuscles') + '*'}
              </Text>
              <Icon onPress={onTargetsPress} colorKey='primary' icon={targets.length ? icons.Config : icons.Plus} />
            </View>
            {!!targets.length && (
              <ScrollView
                bounces={false}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.labels}
              >
                {targets.map(i => (
                  <Label title={t(i)} key={i} />
                ))}
              </ScrollView>
            )}
          </View>
          <View style={styles.item}>
            <View style={styles.itemTitle}>
              <Text variant='pMDRegular' colorKey='onSurfaceDim'>
                {t('restTimer')}
              </Text>
              <Pressable rippleConfig={{ foreground: true }} style={styles.iconWrapper} onPress={onRestTimerPress}>
                <Text variant='pMDRegular' colorKey='primary'>
                  {(restTimeInfo.min ? restTimeInfo.min + 'm' : '') +
                    (restTimeInfo.sec ? restTimeInfo.sec + 's' : '0s')}
                </Text>
                <Icon colorKey='primary' icon={icons.ExpandRight} />
              </Pressable>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.itemTitle}>
              <Text variant='pMDRegular' colorKey='onSurfaceDim'>
                Exercise Link
              </Text>
              <Icon colorKey='primary' icon={icons.Plus} />
            </View>
          </View>
          <View style={[styles.item, styles.bottomItem]} onLayout={enableScrollTo ? onLayout : undefined}>
            <Text variant='pMDRegular' colorKey='onSurfaceDim'>
              Exercise Notes
            </Text>
            <Input
              onFocus={() => {
                enableScrollTo &&
                  setTimeout(() => {
                    ref.current?.scrollTo({ y: scrollTo });
                  }, 150);
              }}
              variant='textArea'
              placeholder='Exercise Notes'
            />
          </View>
        </Card>
      </ScrollView>
      <Button
        float
        alignment='right'
        variant='primary'
        title='Add To Workout'
        onPress={() => {
          if (title && targets.length >= 1) {
            dispatch(createExercise(formValues));
            dismissKeyboardBeforeAction(() => navigation.dispatch(StackActions.pop(2)));
          } else {
            if (!title) {
              titleRequiredAlert();
            } else if (targets.length < 1) {
              targetsRequiredAlert();
            }
          }
        }}
        icon={icons.Plus}
      />
    </KeyboardSafeView>
  );
}
const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
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
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[5],
      borderBottomWidth: 1,
      borderColor: theme.colors.outlineExtraDim,
    },
    targets: {
      gap: theme.spacing[3],
    },
    labels: {
      flexDirection: 'row',
      gap: theme.spacing[1],
      paddingRight: theme.spacing[1],
    },
    topItem: {
      paddingTop: theme.spacing[3],
      paddingBottom: theme.spacing[4],
      borderBottomWidth: 0,
    },
    iconWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemTitle: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    bottomItem: {
      borderBottomWidth: 0,
    },
  });
};
