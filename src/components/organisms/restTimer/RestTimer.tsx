import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '~components/atoms/button/Button';
import { Text } from '~components/atoms/text/Text';
import ScrollPicker from '~components/layout/ScrollPicker/ScrollPicker';
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

  const totalSeconds = minutes * 60 + seconds;
  const onSave = useCallback(() => {
    setTimer(totalSeconds);
  }, [setTimer, totalSeconds]);

  const selectedMinuteIndex = values.min;
  const selectedSecondIndex = values.sec;

  return (
    <View>
      <View style={styles.modal}>
        <View style={styles.picker}>
          <ScrollPicker
            data={minuteOptions}
            selectedIndex={selectedMinuteIndex}
            renderItem={(data, selected) => {
              return (
                <View style={{ paddingLeft: 70, height: '100%' }}>
                  <Text variant='h1Regular' colorKey={selected ? 'primary' : 'onSurfaceExtraDim'}>
                    {data}
                  </Text>
                </View>
              );
            }}
            onValueChange={data => {
              setMinutes(Number(data));
            }}
            wrapperHeight={pickerHeight}
            itemHeight={pickerItemHeight}
            // https://gorhom.github.io/react-native-bottom-sheet/troubleshooting/#adding-horizontal-flatlist-or-scrollview-is-not-working-properly-on-android
            scrollViewComponent={ScrollView}
          />
          <Text colorKey='primary' style={styles.colon} variant='h1Regular'>
            :
          </Text>
          <ScrollPicker
            data={secondOptions}
            selectedIndex={selectedSecondIndex}
            renderItem={(data, selected) => {
              return (
                <View style={{ paddingRight: 70, height: '100%' }}>
                  <Text variant='h1Regular' colorKey={selected ? 'primary' : 'onSurfaceExtraDim'}>
                    {data}
                  </Text>
                </View>
              );
            }}
            onValueChange={data => {
              setSeconds(Number(data));
            }}
            wrapperHeight={pickerHeight}
            itemHeight={pickerItemHeight}
            scrollViewComponent={ScrollView}
          />
        </View>
      </View>
      <Button disabled={false} title='Save' variant='primary' onPress={onSave} />
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    modal: {
      gap: theme.spacing[4],
      minHeight: Platform.OS === 'ios' ? 100 : 140,
      marginVertical: theme.spacing[6],
      justifyContent: 'center',
      alignItems: 'center',
    },
    picker: {
      height: 150,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
    },
    colon: {
      position: 'absolute',
      lineHeight: 52,
      zIndex: -1,
    },
  });
};
