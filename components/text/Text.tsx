import { Text as RNText, StyleProp, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { useTheme, IThemedText, IColorKeys } from '~utils/ThemeContext';

interface IProps {
  text?: string;
  variant?: keyof IThemedText;
  color?: IColorKeys;
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
      style={[{ color: theme.colors[color] }, { ...theme.text[variant] }, animatedStyles, customStyles]}
    >
      {children || text}
    </Animated.Text>
  ) : (
    <RNText
      numberOfLines={numberOfLines}
      style={[{ color: theme.colors[color] }, { ...theme.text[variant] }, customStyles]}
    >
      {children || text}
    </RNText>
  );
};
