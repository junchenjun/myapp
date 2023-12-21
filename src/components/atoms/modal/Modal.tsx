import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ReactElement, RefObject, useCallback, useRef } from 'react';
import { BackHandler, Keyboard, NativeEventSubscription, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '~components/atoms/text/Text';
import { ITheme, IThemeColorKeys, useThemedStyles } from '~theme/ThemeContext';

/**
 * hook that dismisses the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetRef ref to the bottom sheet which is going to be closed/dismissed on the back press
 */
const useBottomSheetBackHandler = (bottomSheetRef: React.RefObject<BottomSheetModal | null>) => {
  const backHandlerSubscriptionRef = useRef<NativeEventSubscription | null>(null);
  const handleSheetPositionChange = useCallback<NonNullable<BottomSheetModalProps['onChange']>>(
    (index: number) => {
      const isBottomSheetVisible = index >= 0;
      if (isBottomSheetVisible && !backHandlerSubscriptionRef.current) {
        // setup the back handler if the bottom sheet is right in front of the user
        backHandlerSubscriptionRef.current = BackHandler.addEventListener('hardwareBackPress', () => {
          bottomSheetRef.current?.dismiss();
          return true;
        });
      } else if (!isBottomSheetVisible) {
        backHandlerSubscriptionRef.current?.remove();
        backHandlerSubscriptionRef.current = null;
      }
    },
    [bottomSheetRef, backHandlerSubscriptionRef]
  );
  return { handleSheetPositionChange };
};

interface IProps {
  modalRef: RefObject<BottomSheetModal>;
  children?: ReactElement | ReactElement[];
  title?: string;
  backgroundColorKey?: Extract<IThemeColorKeys, 'surface' | 'surfaceExtraBright'>;
  onDismiss?: () => void;
}

export const Modal = (props: IProps) => {
  const { modalRef, children, title, backgroundColorKey = 'surfaceExtraBright', onDismiss } = props;
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(themedStyles({ insets, backgroundColorKey }));
  const { handleSheetPositionChange } = useBottomSheetBackHandler(modalRef);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
    []
  );

  return (
    <BottomSheetModal
      enableDismissOnClose
      index={0}
      enableDynamicSizing
      enablePanDownToClose
      ref={modalRef}
      topInset={insets.top}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.backgroundStyle}
      handleIndicatorStyle={styles.handle}
      onChange={handleSheetPositionChange}
      keyboardBlurBehavior='restore'
      android_keyboardInputMode='adjustResize'
      keyboardBehavior='interactive'
      onDismiss={onDismiss}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <BottomSheetView style={[styles.view, !!title && styles.withTitle]}>
          {title && (
            <Text variant='h6Regular' style={styles.title}>
              {title}
            </Text>
          )}
          {children}
        </BottomSheetView>
      </TouchableWithoutFeedback>
    </BottomSheetModal>
  );
};
const themedStyles = (extra: {
  insets: EdgeInsets;
  backgroundColorKey: Extract<IThemeColorKeys, 'surface' | 'surfaceExtraBright'>;
}) => {
  const styles = (theme: ITheme) => {
    const paddingBottom = extra.insets.bottom ? extra.insets.bottom + theme.spacing[4] : theme.spacing[6];
    return StyleSheet.create({
      backgroundStyle: {
        backgroundColor: theme.colors[extra.backgroundColorKey],
        borderTopLeftRadius: theme.radius.xl,
        borderTopRightRadius: theme.radius.xl,
        borderRadius: 0,
      },
      title: {
        paddingBottom: theme.spacing[4],
        paddingTop: 0,
        textAlign: 'center',
      },
      withTitle: {
        paddingTop: 0,
      },
      view: {
        paddingHorizontal: theme.spacing[4],
        paddingVertical: theme.spacing[2],
        paddingBottom,
      },
      handle: {
        backgroundColor: theme.colors.outlineDim,
      },
    });
  };
  return styles;
};
