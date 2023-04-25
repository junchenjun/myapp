import { StyleSheet, View } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';

import ThemedText from './ThemedText';
import { useThemedStyles } from '../hooks/useThemedStyles';
import { Theme } from '../redux/themeSlice';

interface IProps {
  onPress: () => void;
  title: string;
  type?: 'primary' | 'secondary';
}

export default function ThemedButton(props: IProps) {
  const { onPress, title, type = 'primary' } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <BaseButton
      rippleColor={type !== 'primary' ? '#9AAC93' : null}
      style={[styles.button, type === 'primary' ? styles.primary : {}]}
      onPress={onPress}>
      <View style={[styles.view, type === 'primary' ? {} : styles.viewSecondary]}>
        <ThemedText
          text={title}
          size={type === 'primary' ? 'heading3' : 'body1'}
          color={type === 'primary' ? 'text300' : 'secondary'}
        />
      </View>
    </BaseButton>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      borderRadius: 8,
      width: '100%',
    },
    primary: {
      backgroundColor: theme.color.primary,
    },
    view: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewSecondary: {
      backgroundColor: 'transparent',
      borderColor: theme.color.secondary,
      borderWidth: 1,
      borderStyle: 'solid',
    },
  });
};
