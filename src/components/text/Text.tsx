import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import Animated, { AnimatedStyle } from 'react-native-reanimated';

import { useTheme, IThemedText, IThemeColorKeys } from '~theme/ThemeContext';

interface IProps {
  text?: string;
  variant?: keyof IThemedText;
  colorKey?: IThemeColorKeys;
  animatedStyles?: StyleProp<AnimatedStyle<StyleProp<TextStyle>>>;
  style?: TextStyle;
  children?: string | number;
  numberOfLines?: number;
}

export const Text = (props: IProps) => {
  const {
    text,
    variant = 'pMDRegular',
    colorKey = 'onSurface',
    numberOfLines = 1,
    animatedStyles,
    children,
    style: customStyles,
  } = props;
  const theme = useTheme();

  return animatedStyles ? (
    <Animated.Text
      numberOfLines={numberOfLines}
      style={[{ color: theme.colors[colorKey] }, { ...theme.fonts[variant] }, animatedStyles, customStyles]}
    >
      {children || text}
    </Animated.Text>
  ) : (
    <RNText
      numberOfLines={numberOfLines}
      style={[{ color: theme.colors[colorKey] }, { ...theme.fonts[variant] }, customStyles]}
    >
      {children || text}
    </RNText>
  );
};
