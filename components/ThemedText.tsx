import { Text, StyleSheet } from 'react-native';

import { useThemedStyles } from '../hooks/useThemedStyles';
import { Theme } from '../redux/themeSlice';

interface IProps {
  text: string;
  size?: 'body1' | 'body2' | 'body3' | 'body4' | 'body5' | 'heading1' | 'heading2' | 'heading3';
  color?: 'primary' | 'text300' | 'secondary';
  style?: 'medium' | 'regular' | 'bold';
}

export default function ThemedText(props: IProps) {
  const { text, size = 'body1', color = 'text300', style = 'regular' } = props;
  const styles = useThemedStyles(themedStyles);

  return <Text style={[styles[color], styles[style], styles[size]]}>{text}</Text>;
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
    text100: {
      color: theme.color.text100,
    },
    heading1: {
      fontSize: 30,
      fontFamily: 'Kanit-Medium',
    },
    heading2: {
      fontSize: 22,
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
