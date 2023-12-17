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
  backgroundColor?: keyof Pick<ITheme['colors'], 'surface' | 'surfaceExtraBright'>;
}

export const Modal = (props: IProps) => {
  const { bottomSheetModalRef, children, title, backgroundColor = 'surfaceExtraBright' } = props;
  const insets = useSafeAreaInsets();
  const styles = useThemedStyles(themedStyles({ insets, backgroundColor }));
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
const themedStyles = (extra: {
  insets: EdgeInsets;
  backgroundColor: keyof Pick<ITheme['colors'], 'surface' | 'surfaceExtraBright'>;
}) => {
  const styles = (theme: ITheme) => {
    return StyleSheet.create({
      backgroundStyle: {
        backgroundColor: theme.colors[extra.backgroundColor],
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
        paddingBottom: extra.insets.bottom + theme.spacing[10],
      },
      view: {
        paddingHorizontal: theme.spacing[4],
        paddingVertical: theme.spacing[2],
        paddingBottom: extra.insets.bottom + theme.spacing[4],
      },
      handle: {
        backgroundColor: theme.colors.outlineDim,
      },
    });
  };
  return styles;
};
