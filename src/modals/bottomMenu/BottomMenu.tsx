import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { MenuItem } from '~components/menuItem/MenuItem';
import { Modal } from '~components/modal/Modal';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IProps {
  items: React.ComponentProps<typeof MenuItem>[];
  bottomSheetModalRef: RefObject<BottomSheetModal>;
}

export const BottomMenu = (props: IProps) => {
  const { items, bottomSheetModalRef } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <Modal bottomSheetModalRef={bottomSheetModalRef} backgroundColor='surface'>
      <View style={styles.content}>
        {items.map((i, index) => {
          return <MenuItem key={i.title + index} {...i} />;
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
