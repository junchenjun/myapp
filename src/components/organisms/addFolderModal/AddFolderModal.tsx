import { useBottomSheet, useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
import { createFolder } from '~firebase/firebaseConfig';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export const AddFolderModal = ({ setFolder }: { setFolder: Dispatch<SetStateAction<string | undefined>> }) => {
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const folders = useAppSelector(state => state.folders);

  const styles = useThemedStyles(themedStyles);
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const { close } = useBottomSheet();

  const exists = !!folders.filter(i => i.name === value).length;

  let error = '';
  if (exists) {
    error = 'A folder with the same name already exists';
  }
  if (folders.length >= 5) {
    error = 'You can only have up to 5 folders';
  }
  if (submitting) {
    error = '';
  }

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

  const onSave = useCallback(() => {
    setSubmitting(true);
    createFolder(value).then(id => {
      close();
      setFolder(id);
    });
  }, [close, setFolder, value]);

  return (
    <View>
      <View style={styles.modal}>
        <Icon icon={icons.Folder} size={36} />
        <Input
          editable={folders.length < 5 && !submitting}
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          handleKeyboardInModal
          value={value}
          onChangeValue={v => setValue(v)}
          placeholder='Name for the folder'
          errorMessage={error}
        />
      </View>
      <Button disabled={!value || !!error || submitting} title='Save' variant='primary' onPress={onSave} />
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
