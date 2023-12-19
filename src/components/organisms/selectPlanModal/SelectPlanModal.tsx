import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { Modal } from '~components/atoms/modal/Modal';
import { SelectItem } from '~components/atoms/selectItem/SelectItem';
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
        <SelectItem title='Plan A' onPress={() => null} selected={false} variant='large' />
        <SelectItem title='Plan B' onPress={() => null} selected variant='large' />
        <Button icon={icons.Plus} title='New Workout Plan' variant='ghost' />
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
