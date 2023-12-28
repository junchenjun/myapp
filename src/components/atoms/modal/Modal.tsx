import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ReactElement, RefObject, useCallback, useRef } from 'react';
import {
  BackHandler,
  Keyboard,
  NativeEventSubscription,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, IButtonProps } from '~components/atoms/button/Button';
import { Text } from '~components/atoms/text/Text';
import { ITheme, IThemeColorKeys, useThemedStyles } from '~theme/ThemeContext';

/**
 * hook that dismisses the bottom sheet on the hardware back button press if it is visible
 * @param bottomSheetRef ref to the bottom sheet which is going to be closed/dismissed on the back press
 */
const useBottomSheetBackHandler = (bottomSheetRef: RefObject<BottomSheetModal | null>) => {
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
  floatButton?: Pick<IButtonProps, 'title' | 'disabled' | 'onPress' | 'icon'>;
  scrollEnabled?: boolean;
  // autoDismissKeyboard required to be false to work with ScrollPicker
  // autoDismissKeyboard required to be true to work with non-scrollable modal with Input
  // autoDismissKeyboard overwrites scrollEnabled
  autoDismissKeyboard?: boolean;
}

export const Modal = (props: IProps) => {
  const {
    modalRef,
    children,
    title,
    scrollEnabled,
    floatButton,
    backgroundColorKey = 'surfaceExtraBright',
    autoDismissKeyboard = true,
    onDismiss,
  } = props;
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(themedStyles(insets, backgroundColorKey));
  const { handleSheetPositionChange } = useBottomSheetBackHandler(modalRef);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />,
    []
  );

  const titleComponent = title && (
    <View style={[styles.title, scrollEnabled && styles.borderedTitle]}>
      <Text variant='h6Regular' colorKey='onSurface'>
        {title}
      </Text>
    </View>
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
      {scrollEnabled ? (
        <>
          {titleComponent}
          <BottomSheetScrollView
            showsVerticalScrollIndicator={false}
            scrollEnabled={!!scrollEnabled}
            contentContainerStyle={[styles.view, !!title && styles.withTitle]}
          >
            {children}
          </BottomSheetScrollView>
        </>
      ) : autoDismissKeyboard ? (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <BottomSheetView style={[styles.view, !!title && styles.withTitle]}>
            {titleComponent}
            {children}
          </BottomSheetView>
        </TouchableWithoutFeedback>
      ) : (
        <BottomSheetView style={[styles.view, !!title && styles.withTitle]}>
          {titleComponent}
          {children}
        </BottomSheetView>
      )}

      {floatButton && <Button {...floatButton} variant='primary' float alignment='center' />}
    </BottomSheetModal>
  );
};

const themedStyles = (
  insets: EdgeInsets,
  backgroundColorKey: Extract<IThemeColorKeys, 'surface' | 'surfaceExtraBright'>
) => {
  const styles = (theme: ITheme) => {
    const paddingBottom = insets.bottom ? insets.bottom + theme.spacing[4] : theme.spacing[6];
    return StyleSheet.create({
      backgroundStyle: {
        borderTopLeftRadius: theme.radius.xl,
        borderTopRightRadius: theme.radius.xl,
        borderRadius: 0,
        backgroundColor: theme.colors[backgroundColorKey],
      },
      title: {
        paddingBottom: theme.spacing[4],
        paddingTop: 0,
        alignItems: 'center',
      },
      borderedTitle: {
        borderBottomWidth: 1,
        borderColor: theme.colors.outlineDim,
      },
      withTitle: {
        paddingTop: 0,
        paddingBottom,
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
