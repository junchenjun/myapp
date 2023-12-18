import { StyleSheet, View } from 'react-native';

import { icons } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

type IWeeklyActivityItem = { value: string; variant: 'inactive' | 'completed' | 'active'; onPress?: () => void };

type IWeeklyActivityConfig = Record<'mo' | 'tu' | 'we' | 'th' | 'fr' | 'sa' | 'su', IWeeklyActivityItem>;

export const WeeklyActivity = ({ config }: { config: IWeeklyActivityConfig }) => {
  const styles = useThemedStyles(themedStyles);

  const getItem = (i: IWeeklyActivityItem) => {
    return (
      <>
        <Text
          variant='pMDRegular'
          color={i.variant === 'inactive' ? 'onSurfaceExtraDim' : i.variant === 'active' ? 'primary' : 'onSurfaceDim'}
        >
          {i.value}
        </Text>
        <Icon
          icon={icons.Unchecked}
          size={16}
          color={i.variant === 'inactive' ? 'outline' : i.variant === 'active' ? 'primary' : 'onSurfaceDim'}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      {Object.values(config).map((i, index) =>
        i.onPress ? (
          <Pressable
            style={styles.item}
            key={index}
            onPress={i.onPress}
            rippleConfig={{ color: 'rippleDim' }}
            hitSlop={5}
          >
            {getItem(i)}
          </Pressable>
        ) : (
          <View key={index} style={styles.item}>
            {getItem(i)}
          </View>
        )
      )}
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: theme.spacing[2],
      paddingHorizontal: theme.spacing[1],
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    item: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: theme.spacing[2],
      width: 35,
    },
  });
};