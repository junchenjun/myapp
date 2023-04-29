import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import ThemedText from './ThemedText';
import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../redux/themeSlice';

interface IProps {
  onPress: () => void;
  title: string;
  type?: 'primary' | 'secondary';
  style?: any;
}

export default function ThemedButton(props: IProps) {
  const { onPress, title, type = 'primary', style: customStyle } = props;
  const styles = useThemedStyles(themedStyles);

  const isPrimary = type === 'primary';

  return (
    <RectButton
      rippleColor={type !== 'primary' ? '#D1D2E8' : null}
      style={[styles.button, type === 'primary' ? styles.primary : {}, customStyle]}
      onPress={onPress}>
      <View style={[styles.view, isPrimary ? {} : styles.viewSecondary]}>
        <ThemedText
          text={title}
          size={isPrimary ? 'body1' : 'body2'}
          weight={isPrimary ? 'medium' : 'regular'}
          color={isPrimary ? 'text300' : 'secondary'}
        />
      </View>
    </RectButton>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: theme.borders.borderRadius,
      width: '100%',
    },
    primary: {
      backgroundColor: theme.color.primary,
    },
    view: {
      width: '100%',
      height: '100%',
      borderRadius: theme.borders.borderRadius,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewSecondary: {
      backgroundColor: 'transparent',
      borderColor: theme.color.secondary,
      borderStyle: 'dashed',
      borderWidth: 1,
    },
  });
};
