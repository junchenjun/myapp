import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Label } from '~components/atoms/label/Label';
import { Modal } from '~components/atoms/modal/Modal';
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

  const closeModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  return (
    <View style={styles.container}>
      {menu && (
        <Modal modalRef={modalRef} backgroundColorKey='surface'>
          <BottomMenu items={menu} onItemPressCallback={closeModal} />
        </Modal>
      )}
      <ScrollView
        overScrollMode='never'
        bounces={labels && labels.length >= 3}
        horizontal
        contentContainerStyle={styles.labels}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.container} onStartShouldSetResponder={() => true}>
          {labels?.map(i => (
            <Label title={i} key={i} />
          ))}
        </View>
      </ScrollView>
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
      gap: theme.spacing[1],
    },
    labels: {
      flexDirection: 'row',
      gap: theme.spacing[1],
    },
  });
};
