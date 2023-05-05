import { Text, StyleSheet, TextStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';

interface IProps {
  text?: string;
  size?: 'body1' | 'body2' | 'body3' | 'body4' | 'body5' | 'heading1' | 'heading2' | 'heading3';
  color?: 'primary' | 'text300' | 'secondary' | 'text100' | 'text200' | 'white';
  weight?: 'medium' | 'regular' | 'bold';
  animatedStyles?: TextStyle;
  style?: TextStyle;
  children?: string | number;
  numberOfLines?: number;
}

export default function ThemedText(props: IProps) {
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
      style={[styles[color], styles[size], styles[weight], animatedStyles, customStyles]}>
      {children || text}
    </Animated.Text>
  ) : (
    <Text
      numberOfLines={numberOfLines}
      style={[styles[color], styles[size], styles[weight], customStyles]}>
      {children || text}
    </Text>
  );
}

const themedStyles = (theme: Theme) => {
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
      color: theme.color.primary,
    },
    secondary: {
      color: theme.color.secondary,
    },
    text300: {
      color: theme.color.text300,
    },
    text200: {
      color: theme.color.text200,
    },
    text100: {
      color: theme.color.text100,
    },
    white: {
      color: theme.color.white,
    },
    heading1: {
      fontSize: 30,
      fontFamily: 'Kanit-Medium',
    },
    heading2: {
      fontSize: 21,
      fontFamily: 'Kanit-Medium',
    },
    heading3: {
      fontSize: 20,
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
