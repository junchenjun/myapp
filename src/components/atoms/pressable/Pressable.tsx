import { MouseEvent, ReactElement, ReactNode } from 'react';
import { GestureResponderEvent, StyleProp, TouchableOpacity, ViewStyle } from 'react-native';

interface IProps {
  onPress?: (e: MouseEvent<HTMLAnchorElement> | GestureResponderEvent) => void;
  disabled?: boolean;
  children?: ReactElement | (ReactElement | undefined)[] | ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Pressable = (props: IProps) => {
  const { onPress, children, style, disabled = false } = props;

  const opacityValue = 0.35;

  return (
    <TouchableOpacity
      activeOpacity={opacityValue}
      disabled={!onPress || disabled}
      style={[style, disabled && { opacity: opacityValue }]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};
