import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { RefObject } from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Modal } from '~components/modal/Modal';
import { SelectButton } from '~components/selectButton/SelectButton';
import { ITheme, appColorScheme, useTheme, useThemedStyles } from '~theme/ThemeContext';
import { useUpdateAppColorScheme } from '~utils/hooks/useUpdateAppColorScheme';
import { saveToSecureStore, secureStoreKeys } from '~utils/secureStore';

interface IProps {
  bottomSheetModalRef: RefObject<BottomSheetModal>;
}

export const AppearanceModal = (props: IProps) => {
  const { bottomSheetModalRef } = props;
  const theme = useTheme();
  const updateAppColorScheme = useUpdateAppColorScheme();

  const styles = useThemedStyles(themedStyles);

  const setTheme = (v: (typeof appColorScheme)[keyof typeof appColorScheme]) => {
    saveToSecureStore(secureStoreKeys.colorscheme, v).then(() => {
      updateAppColorScheme(v);
    });
  };

  return (
    <Modal bottomSheetModalRef={bottomSheetModalRef} title='Appearance'>
      <View style={styles.modal}>
        <SelectButton
          icon={icons.Appearance}
          title='Light Mode'
          onPress={() => setTheme(appColorScheme.light)}
          selected={!theme.systemDefault && theme.id === appColorScheme.light}
        />
        <SelectButton
          icon={icons.Appearance}
          title='Dark Mode'
          onPress={() => setTheme(appColorScheme.dark)}
          selected={!theme.systemDefault && theme.id === appColorScheme.dark}
        />
        <SelectButton
          icon={icons.Appearance}
          title='System Default'
          onPress={() => setTheme(appColorScheme.system)}
          selected={theme.systemDefault}
        />
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
