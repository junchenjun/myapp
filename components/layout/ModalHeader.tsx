import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import IconClose from '../../assets/icons/IconClose';
import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import ThemedText from '../element/ThemedText';

interface IProps {
  onClose?: () => void;
  title?: string;
}

export default function ModalHeader(props: IProps) {
  const { onClose, title } = props;
  const styles = useThemedStyles(themedStyles);
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: title ? 'space-between' : 'flex-end',
        },
      ]}>
      {title && <ThemedText text={title} size="heading2" />}
      <BorderlessButton onPress={() => (onClose ? onClose() : router.back())}>
        <IconClose width={30} height={30} stroke={styles.icon.color} />
      </BorderlessButton>
    </View>
  );
}

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: 20,
    },
    icon: {
      color: theme.color.text100,
    },
  });
};
