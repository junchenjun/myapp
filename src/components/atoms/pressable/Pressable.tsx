import { MouseEvent, ReactElement, ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';

interface IProps {
  onPress?: (e: MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => void;
  disabled?: boolean;
  children?: ReactElement | (ReactElement | undefined)[] | ReactNode;
  style?: StyleProp<ViewStyle>;
  hitSlop?: number;
}

export const Pressable = (props: IProps) => {
  const { onPress, children, disabled, style, hitSlop } = props;

  const opacityValue = 0.35;

  return onPress ? (
    <TouchableOpacity
      activeOpacity={opacityValue}
      hitSlop={hitSlop ?? 20}
      disabled={disabled}
      style={[style, disabled && { opacity: opacityValue }]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[style, disabled && { opacity: opacityValue }]}>{children}</View>
  );
};
