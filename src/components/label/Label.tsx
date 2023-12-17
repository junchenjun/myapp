import { StyleSheet, View } from 'react-native';

import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  title: string;
}

export const Label = (props: IProps) => {
  const { title } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.container}>
      <Text variant='pSMRegular' color='onSurfaceDim'>
        {title}
      </Text>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.sm,
      display: 'flex',
      flexDirection: 'column',
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1],
      paddingBottom: theme.spacing[1] + 1,
      alignSelf: 'flex-start',
    },
  });
};
