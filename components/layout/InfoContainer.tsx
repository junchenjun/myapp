import { StyleSheet, View } from 'react-native';

import { useThemedStyles } from '../../hooks/useThemedStyles';
import { Theme } from '../../redux/themeSlice';
import ThemedText from '../element/ThemedText';

interface IProps {
  title: string;
  content: string;
  styles?: any;
}

export default function InfoConatiner(props: IProps) {
  const { content, title, styles: customStyles } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={[styles.container, customStyles]}>
      <ThemedText size="body4" color="text100">
        {title}
      </ThemedText>
      <ThemedText size="body2" color="secondary">
        {content}
      </ThemedText>
    </View>
  );
}

const themedStyles = (theme: Theme) => {
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
