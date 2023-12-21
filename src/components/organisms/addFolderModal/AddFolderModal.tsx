import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export const AddFolderModal = () => {
  const [value, setValue] = useState('');
  const styles = useThemedStyles(themedStyles);

  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  const handleOnFocus = useCallback(() => {
    Platform.OS === 'ios' && (shouldHandleKeyboardEvents.value = true);
  }, [shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    Platform.OS === 'ios' && (shouldHandleKeyboardEvents.value = false);
  }, [shouldHandleKeyboardEvents]);

  return (
    <View>
      <View style={styles.modal}>
        <Icon icon={icons.Folder} size={36} />
        <Input
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          handleKeyboardInModal
          value={value}
          onChangeValue={v => setValue(v)}
          placeholder='Name for the folder'
        />
      </View>
      <Button title='Save' variant='primary' onPress={() => null} />
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
    },
  });
};
