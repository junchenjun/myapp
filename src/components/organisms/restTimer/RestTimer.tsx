import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Button } from '~components/atoms/button/Button';
import { Text } from '~components/atoms/text/Text';
import ScrollPicker from '~components/layout/ScrollPicker/ScrollPicker';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export const RestTimer = (props: { setTimer: Dispatch<SetStateAction<number>>; timer: number }) => {
  const { setTimer, timer } = props;

  const [newTimer, setNewTimer] = useState(timer);

  const pickerItemHeight = 50;
  const pickerHeight = pickerItemHeight * 3;
  const styles = useThemedStyles(themedStyles);

  const mins = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
  const seconds = [
    '00',
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
  ];

  const onSave = useCallback(() => {
    setTimer(newTimer);
  }, [newTimer, setTimer]);

  return (
    <View>
      <View style={styles.modal}>
        <View style={styles.picker}>
          <ScrollPicker
            dataSource={mins}
            selectedIndex={1}
            renderItem={(data, selected) => {
              return (
                <View style={{ paddingLeft: 70, height: '100%' }}>
                  <Text variant='h1Regular' colorKey={selected ? 'primary' : 'onSurfaceExtraDim'}>
                    {data}
                  </Text>
                </View>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              //
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
            dataSource={seconds}
            selectedIndex={30}
            renderItem={(data, selected) => {
              return (
                <View style={{ paddingRight: 70, height: '100%' }}>
                  <Text variant='h1Regular' colorKey={selected ? 'primary' : 'onSurfaceExtraDim'}>
                    {data}
                  </Text>
                </View>
              );
            }}
            onValueChange={(data, selectedIndex) => {
              //
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
