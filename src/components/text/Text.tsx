import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme, IThemedText, ITheme } from '~theme/ThemeContext';

interface IProps {
  text?: string;
  variant?: keyof IThemedText;
  color?: keyof ITheme['colors'];
  animatedStyles?: StyleProp<Animated.AnimateStyle<StyleProp<TextStyle>>>;
  style?: TextStyle;
  children?: string | number;
  numberOfLines?: number;
}

export const Text = (props: IProps) => {
  const {
    text,
    variant = 'pMDRegular',
    color = 'onSurface',
    numberOfLines = 1,
    animatedStyles,
    children,
    style: customStyles,
  } = props;
  const theme = useTheme();

  return animatedStyles ? (
    <Animated.Text
      numberOfLines={numberOfLines}
      style={[{ color: theme.colors[color] }, { ...theme.fonts[variant] }, animatedStyles, customStyles]}
    >
      {children || text}
    </Animated.Text>
  ) : (
    <RNText
      numberOfLines={numberOfLines}
      style={[{ color: theme.colors[color] }, { ...theme.fonts[variant] }, customStyles]}
    >
      {children || text}
    </RNText>
  );
};
