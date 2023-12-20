import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Modal } from '~components/atoms/modal/Modal';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
import { IPlan } from '~redux/planSlice';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ISelectPlanModalProps {
  modalRef: RefObject<BottomSheetModal>;
  planIDs: { id: IPlan['id']; name: IPlan['name'] }[];
  selectedID: IPlan['id'];
  onSelect: (id: IPlan['id']) => void;
  onActionButton: () => void;
}

export const SelectPlanModal = (props: ISelectPlanModalProps) => {
  const { modalRef, planIDs, selectedID, onSelect, onActionButton } = props;

  const styles = useThemedStyles(themedStyles);

  return (
    <Modal modalRef={modalRef} title='Select Workout Plan'>
      <View style={styles.modal}>
        {planIDs.map(p => (
          <SelectItem
            key={p.id}
            title={p.name}
            onPress={() => onSelect(p.id)}
            selected={p.id === selectedID}
            variant='large'
          />
        ))}
        <Button onPress={onActionButton} icon={icons.Plus} title='New Workout Plan' variant='ghost' />
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
