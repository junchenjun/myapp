import { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import ThemedText from './ThemedText';
import { DARK_THEME_ID, Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/_layout';

interface IProps {
  onPress: () => void;
  title: string;
  type?: 'primary' | 'secondary';
  size?: 'tall' | 'medium' | 'short';
  style?: ViewStyle | ViewStyle[];
  icon?: ReactElement;
}

export default function ThemedButton(props: IProps) {
  const {
    onPress,
    title,
    type = 'primary',
    style: customStyle,
    size = type === 'primary' ? 'tall' : 'medium',
    icon,
  } = props;
  const styles = useThemedStyles(themedStyles);
  const theme = useSelector((state: RootState) => state.theme.styles);

  const isPrimary = type === 'primary';

  const primaryButtonTextColor = theme.id === DARK_THEME_ID ? 'black' : 'white';

  return (
    <RectButton
      style={[
        styles.button,
        styles[size],
        isPrimary ? styles.primary : styles.secondary,
        customStyle,
      ]}
      onPress={onPress}>
      <View style={styles.view}>
        <ThemedText
          text={title}
          size={isPrimary ? 'body1' : 'body2'}
          weight={isPrimary ? 'medium' : 'regular'}
          color={isPrimary ? primaryButtonTextColor : 'text300'}
        />
        {icon}
      </View>
    </RectButton>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      borderRadius: theme.borders.borderRadius,
      width: '100%',
    },
    short: {
      height: 45,
    },
    medium: {
      height: 50,
    },
    tall: {
      height: 55,
    },
    view: {
      width: '100%',
      height: '100%',
      borderRadius: theme.borders.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
      alignContent: 'center',
    },
    primary: {
      backgroundColor: theme.color.primary,
    },
    secondary: {
      backgroundColor: theme.color.secondary,
    },
  });
};
