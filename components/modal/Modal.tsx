import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ReactElement, RefObject, useCallback, useRef } from 'react';
import { BackHandler, NativeEventSubscription, StyleSheet } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

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
  bottomSheetModalRef: RefObject<BottomSheetModal>;
  children?: ReactElement | ReactElement[];
  title?: string;
}

export const Modal = (props: IProps) => {
  const { bottomSheetModalRef, children, title } = props;
  const styles = useThemedStyles(themedStyles);
  const insets = useSafeAreaInsets();
  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetModalRef);

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
      ref={bottomSheetModalRef}
      topInset={insets.top}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.backgroundStyle}
      handleIndicatorStyle={styles.handle}
      onChange={handleSheetPositionChange}
    >
      <BottomSheetView style={[styles.view, !!title && styles.withTitle]}>
        {title && (
          <Text variant='h6Regular' style={styles.title}>
            {title}
          </Text>
        )}
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    backgroundStyle: {
      backgroundColor: theme.colors.surface,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      borderRadius: 0,
    },
    title: {
      paddingVertical: theme.spacing[7],
      paddingTop: 0,
      textAlign: 'center',
    },
    withTitle: {
      paddingTop: 0,
      paddingBottom: insets.bottom + theme.spacing[10],
    },
    view: {
      paddingHorizontal: theme.spacing[4],
      paddingVertical: theme.spacing[2],
      paddingBottom: insets.bottom + theme.spacing[4],
    },
    handle: {
      backgroundColor: theme.colors.outlineDim,
    },
  });
};
