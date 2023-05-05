import { ReactElement } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import ThemedText from './ThemedText';
import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';

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

  const isPrimary = type === 'primary';

  return (
    <RectButton
      rippleColor={type !== 'primary' ? '#D1D2E8' : null}
      style={[styles.button, styles[size], type === 'primary' ? styles.primary : {}, customStyle]}
      onPress={onPress}>
      <View style={[styles.view, isPrimary ? {} : styles.viewSecondary]}>
        <ThemedText
          text={title}
          size={isPrimary ? 'body1' : 'body2'}
          weight={isPrimary ? 'medium' : 'regular'}
          color={isPrimary ? 'white' : 'text300'}
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
    primary: {
      backgroundColor: theme.color.secondary,
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
    viewSecondary: {
      backgroundColor: theme.color.transprant05,
    },
  });
};
