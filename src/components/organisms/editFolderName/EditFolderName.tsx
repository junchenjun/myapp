import { useBottomSheet, useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
import { createFolder, updateFolderName } from '~firebase/firebaseConfig';
import { useAppSelector } from '~redux/store';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export const EditFolderName = (props: {
  setFolder: Dispatch<SetStateAction<string | undefined>>;
  folderId?: string;
}) => {
  const { folderId, setFolder } = props;
  const [value, setValue] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const folders = useAppSelector(state => state.folders);

  const styles = useThemedStyles(themedStyles);
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();
  const { close } = useBottomSheet();

  const isCreate = !folderId;
  const currentName = folders?.all?.find(i => i.id === folderId)?.name;

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

  useEffect(() => {
    if (!isCreate && currentName) {
      setValue(currentName);
    }
  }, [isCreate, currentName]);

  const exists = !!folders?.all?.filter(i => {
    if (isCreate) {
      return i.name === value;
    } else {
      return i.name === value && value !== currentName;
    }
  }).length;

  let error = '';
  if (exists) {
    error = 'A folder with the same name already exists';
  }
  if (submitting) {
    error = '';
  }

  const handleOnFocus = useCallback(() => {
    shouldHandleKeyboardEvents.value = true;
  }, [shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    shouldHandleKeyboardEvents.value = false;
  }, [shouldHandleKeyboardEvents]);

  const onSave = useCallback(() => {
    setSubmitting(true);
    if (isCreate) {
      createFolder(value).then(id => {
        close();
        setFolder(id);
      });
    } else {
      updateFolderName({ id: folderId, name: value }).then(() => {
        close();
        setFolder(folderId);
      });
    }
  }, [close, folderId, isCreate, setFolder, value]);

  const isButtonDisabled = !value || !!error || submitting || (!isCreate && value === currentName);

  return (
    <View>
      <View style={styles.modal}>
        <Icon icon={isCreate ? icons.Folder : icons.Edit} size={36} />
        <Input
          variant='enclosed'
          onBlur={handleOnBlur}
          onFocus={handleOnFocus}
          value={value}
          onChangeValue={v => setValue(v)}
          placeholder={currentName || 'Name for the folder'}
          errorMessage={error}
          showMessage
        />
      </View>
      <Button disabled={isButtonDisabled} title={isCreate ? 'Create' : 'Save'} variant='primary' onPress={onSave} />
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    modal: {
      gap: theme.spacing[4],
      minHeight: 120,
      marginVertical: theme.spacing[6],
      justifyContent: 'center',
    },
  });
};
