import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';

import { IconClose } from '~assets/icons/IconClose';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  onClose?: () => void;
  title?: string;
}

export const ModalHeader = (props: IProps) => {
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
      ]}
    >
      {title && <Text text={title} />}
      <BorderlessButton onPress={() => (onClose ? onClose() : router.back())}>
        <IconClose width={30} height={30} stroke={styles.icon.color} />
      </BorderlessButton>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      paddingTop: 20,
    },
    icon: {
      color: theme.colors.onSurfaceDim,
    },
  });
};
