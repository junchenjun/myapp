import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Modal as RNModal, View, Dimensions } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { EdgeInsets } from 'react-native-safe-area-context';

import { ITheme, useTheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactElement | ReactElement[];
}

export const Modal = (props: IProps) => {
  const { isActive, setIsActive, children } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useTheme();
  const styles = useThemedStyles(themedStyles);

  useEffect(() => {
    isActive && setIsModalVisible(isActive);
  }, [isActive]);

  const animationStartPosition = -50;
  const duration = 200;
  const contentOpacity = useSharedValue(0);
  const contentPosition = useSharedValue(animationStartPosition);
  const backdropColor = useSharedValue('transparent');

  const animatedContentStyle = useAnimatedStyle(() => {
    contentOpacity.value = isModalVisible ? 1 : 0;
    contentPosition.value = isModalVisible
      ? withTiming(0, { duration })
      : withTiming(animationStartPosition, { duration }, finished => {
          'worklet';
          if (finished) {
            runOnJS(setIsActive)(false);
          }
        });
    return {
      opacity: withTiming(contentOpacity.value, { duration }),
      bottom: contentPosition.value,
    };
  });

  const animatedBackdropStyle = useAnimatedStyle(() => {
    backdropColor.value = isModalVisible ? theme.colors.modalBackdrop : 'transparent';
    return {
      backgroundColor: withTiming(backdropColor.value, { duration }),
    };
  });

  return (
    <RNModal
      transparent
      animationType='none'
      statusBarTranslucent
      visible={isActive}
      onRequestClose={() => setIsModalVisible(false)}
    >
      <Animated.View style={[styles.modal, animatedBackdropStyle]}>
        <View style={styles.empty} onTouchEnd={() => setIsModalVisible(false)} />
        <Animated.View style={[styles.content, animatedContentStyle]}>{children}</Animated.View>
      </Animated.View>
    </RNModal>
  );
};

const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
  return StyleSheet.create({
    modal: {
      width: '100%',
      flex: 1,
    },
    empty: {
      flex: 1,
      width: '100%',
    },
    content: {
      backgroundColor: theme.colors.surface,
      maxHeight: Dimensions.get('window').height - insets.top,
      borderTopLeftRadius: theme.radius.xl,
      borderTopRightRadius: theme.radius.xl,
      overflow: 'hidden',
    },
  });
};
