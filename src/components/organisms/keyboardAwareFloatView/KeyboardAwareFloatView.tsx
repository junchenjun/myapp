import { ReactNode, useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet } from 'react-native';
import Animated, { LightSpeedOutRight } from 'react-native-reanimated';

import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export type IKeyboardAwareFloatViewProps = {
  children?: ReactNode | ReactNode[];
  // Android
  hideWhenKeyboardVisible?: boolean;
};

export const KeyboardAwareFloatView = (props: IKeyboardAwareFloatViewProps) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const styles = useThemedStyles(themedStyles);

  useEffect(() => {
    if (Platform.OS === 'android' && props.hideWhenKeyboardVisible) {
      const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
        setKeyboardVisible(true);
      });
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        setKeyboardVisible(false);
      });

      return () => {
        showSubscription.remove();
        hideSubscription.remove();
      };
    }
  }, [props.hideWhenKeyboardVisible]);

  return (
    (!keyboardVisible || Platform.OS === 'ios' || !props.hideWhenKeyboardVisible) && (
      <Animated.View style={styles.float} exiting={LightSpeedOutRight}>
        {props.children}
      </Animated.View>
    )
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    float: {
      position: 'absolute',
      right: theme.spacing[3],
      bottom: 30,
    },
  });
};
