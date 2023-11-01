import { Text as RNText, StyleSheet, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  text?: string;
  size?: 'body1' | 'body2' | 'body3' | 'body4' | 'body5' | 'heading1' | 'heading2' | 'heading3';
  color?: 'primary' | 'text300' | 'text100' | 'text200' | 'surface300';
  weight?: 'medium' | 'regular' | 'bold';
  animatedStyles?: TextStyle;
  style?: TextStyle;
  children?: string | number;
  numberOfLines?: number;
}

export const Text = (props: IProps) => {
  const {
    text,
    size = 'body1',
    color = 'text300',
    weight = 'regular',
    numberOfLines = 1,
    animatedStyles,
    children,
    style: customStyles,
  } = props;
  const styles = useThemedStyles(themedStyles);

  return animatedStyles ? (
    <Animated.Text
      numberOfLines={numberOfLines}
      style={[styles[color], styles[size], styles[weight], animatedStyles, customStyles]}
    >
      {children || text}
    </Animated.Text>
  ) : (
    <RNText numberOfLines={numberOfLines} style={[styles[color], styles[size], styles[weight], customStyles]}>
      {children || text}
    </RNText>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    medium: {
      fontFamily: 'Kanit-Medium',
    },
    regular: {
      fontFamily: 'Kanit-Regular',
    },
    bold: {
      fontFamily: 'Kanit-SemiBold',
    },
    primary: {
      color: theme.colors.primary,
    },
    text300: {
      color: theme.colors.text300,
    },
    text200: {
      color: theme.colors.text200,
    },
    text100: {
      color: theme.colors.text100,
    },
    surface300: {
      color: theme.colors.surface300,
    },
    heading1: {
      fontSize: 30,
      fontFamily: 'Kanit-Medium',
    },
    heading2: {
      fontSize: 25,
      fontFamily: 'Kanit-Medium',
    },
    heading3: {
      fontSize: 21,
      fontFamily: 'Kanit-Medium',
    },
    body1: {
      fontSize: 18,
    },
    body2: {
      fontSize: 16,
    },
    body3: {
      fontSize: 14,
    },
    body4: {
      fontSize: 12,
    },
    body5: {
      fontSize: 10,
    },
  });
};
