import { StyleSheet, View } from 'react-native';

import IconAdd from '../../assets/icons/IconAdd';
import { Theme } from '../../redux/themeSlice';
import { useThemedStyles } from '../../utils/hooks/useThemedStyles';
import ThemedText from '../element/ThemedText';

export const Header = ({ navigation, route, options, back }) => {
  const title = route.params.title;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.inner}>
      <IconAdd width={20} height={20} stroke={styles.icon.color} />
      <ThemedText size="heading2">{title}</ThemedText>
    </View>
  );
};

const themedStyles = (theme: Theme) => {
  return StyleSheet.create({
    inner: {
      padding: 15,
      paddingTop: 40,
      paddingBottom: 20,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 10,
      position: 'relative',
      backgroundColor: theme.color.transparentHeader,
    },
    icon: {
      color: theme.color.text300,
    },
  });
};
