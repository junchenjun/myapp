import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Icon } from '~components/atoms/icon/Icon';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import ScrollPicker, { ScrollPickerHandle } from '~components/layout/ScrollPicker/ScrollPicker';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';
import { getTimerInfoBySeconds, minuteOptions, secondOptions } from '~utils/dateTime';

export const RestTimer = (props: { setTimer: Dispatch<SetStateAction<number>>; timer: number }) => {
  const { setTimer, timer } = props;

  const values = getTimerInfoBySeconds(timer);
  const [minutes, setMinutes] = useState<number>(values.min);
  const [seconds, setSeconds] = useState<number>(values.sec);

  const pickerItemHeight = 50;
  const pickerHeight = pickerItemHeight * 3;
  const styles = useThemedStyles(themedStyles);

  const refM = useRef<ScrollPickerHandle>(null);
  const refS = useRef<ScrollPickerHandle>(null);

  const { t } = useTranslation();

  const totalSeconds = minutes * 60 + seconds;

  const selectedMinuteIndex = values.min;
  const selectedSecondIndex = values.sec;

  const renderItem = useCallback(
    (data: string, selected: boolean, left: boolean) => {
      return (
        <View style={left ? styles.pickerItemLeft : styles.pickerItemRight}>
          <Text variant='h1Regular' colorKey={selected ? 'primary' : 'onSurfaceExtraDim'}>
            {data}
          </Text>
        </View>
      );
    },
    [styles.pickerItemLeft, styles.pickerItemRight]
  );

  const presets = [
    {
      icon: icons.Folder,
      label: t('disabled'),
    },
    {
      title: 30,
      value: 30,
      label: t('secs'),
    },
    {
      title: 1,
      value: 60,
      label: t('min'),
    },
    {
      title: 2,
      value: 120,
      label: t('mins'),
    },
    {
      title: 3,
      value: 180,
      label: t('mins'),
    },
    {
      title: 4,
      value: 240,
      label: t('mins'),
    },
  ];

  const onPresetPress = useCallback((v?: number) => {
    const info = getTimerInfoBySeconds(v);
    refM.current?.scrollToTargetIndex(info.min);
    refS.current?.scrollToTargetIndex(info.sec);
  }, []);

  const onSave = useCallback(() => {
    setTimer(totalSeconds);
  }, [setTimer, totalSeconds]);

  return (
    <View>
      <View style={styles.picker}>
        <ScrollPicker
          ref={refM}
          data={minuteOptions}
          selectedIndex={selectedMinuteIndex}
          renderItem={(data, selected) => renderItem(data, selected, true)}
          onValueChange={data => setMinutes(Number(data))}
          wrapperHeight={pickerHeight}
          itemHeight={pickerItemHeight}
          // https://gorhom.github.io/react-native-bottom-sheet/troubleshooting/#adding-horizontal-flatlist-or-scrollview-is-not-working-properly-on-android
          scrollViewComponent={ScrollView}
        />
        <Text colorKey='primary' style={styles.colon} variant='h1Regular'>
          :
        </Text>
        <ScrollPicker
          ref={refS}
          data={secondOptions}
          selectedIndex={selectedSecondIndex}
          renderItem={(data, selected) => renderItem(data, selected, false)}
          onValueChange={data => setSeconds(Number(data))}
          wrapperHeight={pickerHeight}
          itemHeight={pickerItemHeight}
          scrollViewComponent={ScrollView}
        />
      </View>
      <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={styles.presets} horizontal>
        {presets.map((i, index) => {
          return (
            <Pressable
              rippleConfig={{ colorKey: 'rippleDim' }}
              onPress={() => onPresetPress(i.value)}
              key={index}
              style={styles.presetItem}
            >
              {i.icon ? (
                <Icon style={styles.presetIcon} icon={i.icon} />
              ) : (
                <Text colorKey='onSurfaceDim' variant='h4Regular'>
                  {i.title}
                </Text>
              )}
              <Text colorKey='onSurfaceDim' variant='pXSRegular'>
                {i.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      <Button disabled={false} title={t('save')} variant='primary' onPress={onSave} />
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    picker: {
      gap: theme.spacing[2],
      height: 150,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      marginTop: theme.spacing[4],
    },
    pickerItemLeft: { paddingLeft: 70, height: '100%' },
    pickerItemRight: { paddingRight: 70, height: '100%' },
    colon: {
      position: 'absolute',
      lineHeight: 52,
      zIndex: -1,
    },
    presets: {
      gap: theme.spacing[2],
      paddingVertical: theme.spacing[6],
    },
    presetItem: {
      padding: theme.spacing[5],
      backgroundColor: theme.colors.surfaceDim,
      borderRadius: theme.radius.lg,
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: 90,
      minWidth: 90,
    },
    presetIcon: {
      paddingTop: theme.spacing[1],
    },
  });
};
