import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { ThemedText } from '~components/ThemedText';
import { ITheme } from '~redux/themeSlice';
import { useThemedStyles } from '~utils/hooks/useThemedStyles';

interface IProps {
  title: string;
  content?: string;
  styles?: StyleProp<ViewStyle>;
}

export const InfoConatiner = (props: IProps) => {
  const { content, title, styles: customStyles } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.container, customStyles]}>
      <ThemedText size='body4' color='text100'>
        {title}
      </ThemedText>
      <ThemedText size='body2' color='text300'>
        {content || 'NA'}
      </ThemedText>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'column',
      backgroundColor: theme.color.surface100,
      borderRadius: theme.borders.borderRadius,
      padding: 20,
      gap: 4,
    },
  });
};
