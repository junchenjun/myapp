import { Text as RNText, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { IColors, useTheme, IThemedText } from '~utils/ThemeContext';

interface IProps {
  text?: string;
  type?: keyof IThemedText;
  color?: keyof IColors;
  animatedStyles?: TextStyle;
  style?: TextStyle;
  children?: string | number;
  numberOfLines?: number;
}

export const Text = (props: IProps) => {
  const {
    text,
    type = 'pLGRegular',
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
      style={[{ color: theme.colors[color] }, { ...theme.text[type] }, animatedStyles, customStyles]}
    >
      {children || text}
    </Animated.Text>
  ) : (
    <RNText
      numberOfLines={numberOfLines}
      style={[{ color: theme.colors[color] }, { ...theme.text[type] }, customStyles]}
    >
      {children || text}
    </RNText>
  );
};
