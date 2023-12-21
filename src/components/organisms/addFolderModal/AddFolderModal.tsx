import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Icon } from '~components/atoms/icon/Icon';
import { Input } from '~components/atoms/input/Input';
import { Modal } from '~components/atoms/modal/Modal';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IAddFolderModalProps {
  modalRef: RefObject<BottomSheetModal>;
}

export const AddFolderModal = (props: IAddFolderModalProps) => {
  const { modalRef } = props;
  const [value, setValue] = useState('');
  const styles = useThemedStyles(themedStyles);

  return (
    <Modal modalRef={modalRef} title='Create Folder' onDismiss={() => setValue('')}>
      <View style={styles.modal}>
        <Icon icon={icons.Folder} size={36} />
        <Input handleKeyboardInModal value={value} onChangeValue={v => setValue(v)} placeholder='Name for the folder' />
      </View>
      <Button title='Save' variant='primary' onPress={() => null} />
    </Modal>
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
