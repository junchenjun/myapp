import { StyleSheet, View } from 'react-native';

import { Text } from '~components/atoms/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export type ILabelProps = {
  title: string;
};

export const Label = (props: ILabelProps) => {
  const { title } = props;
  const styles = useThemedStyles(themedStyles);

  return (
    <View style={styles.container}>
      <Text variant='pSMRegular' colorKey='onSurface'>
        {title}
      </Text>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.surfaceDim,
      borderRadius: theme.radius.sm,
      flexDirection: 'column',
      alignSelf: 'flex-start',
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[1],
      paddingBottom: theme.spacing[1] + 1,
    },
  });
};
