import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { MenuItem } from '~components/atoms/menuItem/MenuItem';
import { Modal } from '~components/atoms/modal/Modal';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export type IBottomMenuItems = Pick<
  React.ComponentProps<typeof MenuItem>,
  'danger' | 'iconLeft' | 'onPress' | 'title'
>[];

interface IProps {
  items: IBottomMenuItems;
  modalRef: RefObject<BottomSheetModal>;
}

export const BottomMenu = (props: IProps) => {
  const { items, modalRef } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <Modal modalRef={modalRef} backgroundColorKey='surface'>
      <View style={styles.content}>
        {items.map((i, index) => {
          return <MenuItem iosScaleDownAnimation key={index} {...i} roundedBottomCorners roundedTopCorners />;
        })}
      </View>
    </Modal>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    content: {
      gap: theme.spacing[2],
    },
  });
};
