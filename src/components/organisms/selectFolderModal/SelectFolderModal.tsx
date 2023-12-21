import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Modal } from '~components/atoms/modal/Modal';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import { IPlan } from '~redux/planSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ISelectFolderModalProps {
  modalRef: RefObject<BottomSheetModal>;
  folders: { id: IPlan['id']; name: IPlan['name'] }[];
  selectedID: IPlan['id'];
  onSelect: (id: IPlan['id']) => void;
  onActionButton: () => void;
}

export const SelectFolderModal = (props: ISelectFolderModalProps) => {
  const { modalRef, folders, selectedID, onSelect, onActionButton } = props;

  const styles = useThemedStyles(themedStyles);

  return (
    <Modal modalRef={modalRef} title='Select Folder'>
      <View style={styles.modal}>
        {folders.map(i => (
          <SelectItem
            key={i.id}
            title={i.name}
            onPress={() => onSelect(i.id)}
            selected={i.id === selectedID}
            variant='large'
          />
        ))}
        <Button onPress={onActionButton} icon={icons.Plus} title='New Folder' variant='ghost' />
      </View>
    </Modal>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    modal: {
      gap: theme.spacing[3],
    },
  });
};
