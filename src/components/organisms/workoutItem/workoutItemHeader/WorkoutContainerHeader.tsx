import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Label } from '~components/atoms/label/Label';
import { BottomMenu, IBottomMenuItems } from '~components/organisms/bottomMenu/BottomMenu';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export interface IWorkoutItemHeader {
  menu?: IBottomMenuItems;
  labels?: string[];
}

export const WorkoutItemHeader = (props: IWorkoutItemHeader) => {
  const { menu, labels } = props;
  const styles = useThemedStyles(themedStyles);
  const modalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    modalRef.current?.present();
  }, []);

  return (
    <View style={styles.container}>
      {menu && <BottomMenu modalRef={modalRef} items={menu} />}
      <View style={styles.labels}>
        {labels?.map(i => (
          <Label title={i} key={i} />
        ))}
      </View>
      {menu && <Icon icon={icons.More} onPress={handlePresentModalPress} colorKey='onSurface' fill='onSurface' />}
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    labels: {
      flexDirection: 'row',
      gap: theme.spacing[1],
    },
  });
};