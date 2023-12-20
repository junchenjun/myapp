import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '~components/atoms/button/Button';
import { Modal } from '~components/atoms/modal/Modal';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IAddPlanModalProps {
  modalRef: RefObject<BottomSheetModal>;
}

export const AddPlanModal = (props: IAddPlanModalProps) => {
  const { modalRef } = props;

  const styles = useThemedStyles(themedStyles);

  return (
    <Modal modalRef={modalRef} title='Create Workout Plan'>
      <View style={styles.modal}>
        <Button title='Save' variant='primary' />
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
