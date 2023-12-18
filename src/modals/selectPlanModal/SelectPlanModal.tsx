import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { Button } from '~components/button/Button';
import { Modal } from '~components/modal/Modal';
import { SelectButton } from '~components/selectButton/SelectButton';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IProps {
  modalRef: RefObject<BottomSheetModal>;
}

export const SelectPlanModal = (props: IProps) => {
  const { modalRef } = props;

  const styles = useThemedStyles(themedStyles);

  return (
    <Modal modalRef={modalRef} title='Select Workout Plan'>
      <View style={styles.modal}>
        <SelectButton title='Plan A' onPress={() => null} selected={false} />
        <SelectButton title='Plan B' onPress={() => null} selected />
        <SelectButton title='Plan C' onPress={() => null} selected={false} />
        <Button title='Create New Plan' />
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
