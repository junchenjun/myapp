import { StyleSheet, View } from 'react-native';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  title: string;
  desc?: string;
  iconLeft?: IIcon;
  danger?: boolean;
  roundedTopCorners?: boolean;
  roundedBottomCorners?: boolean;
  withBorder?: boolean;
  onPress?: () => void;
}

export const MenuItem = (props: IProps) => {
  const { title, desc, onPress, iconLeft, danger, roundedTopCorners, roundedBottomCorners, withBorder } = props;

  const styles = useThemedStyles(themedStyles);

  return (
    <View
      style={[
        styles.itemContainer,
        roundedTopCorners && styles.roundedTopCorners,
        roundedBottomCorners && styles.roundedBottomCorners,
        withBorder && styles.withBorder,
      ]}
    >
      <Pressable onPress={onPress} style={styles.item} rippleConfig={{ borderless: false }}>
        {iconLeft && <Icon icon={iconLeft} color={danger ? 'error' : 'onSurfaceDim'} />}
        <View>
          <Text text={title} color={danger ? 'error' : 'onSurface'} />
          {desc && <Text text={desc} variant='pXSRegular' color={danger ? 'error' : 'onSurfaceExtraDim'} />}
        </View>
      </Pressable>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    item: {
      flexDirection: 'row',
      gap: theme.spacing[3],
      padding: theme.spacing[4],
      alignItems: 'center',
    },
    withBorder: {
      borderColor: theme.colors.outlineExtraDim,
      borderBottomWidth: 1,
      borderStyle: 'solid',
    },
    roundedBottomCorners: {
      borderBottomLeftRadius: theme.radius.sm,
      borderBottomRightRadius: theme.radius.sm,
    },
    roundedTopCorners: {
      borderTopLeftRadius: theme.radius.sm,
      borderTopRightRadius: theme.radius.sm,
    },
    itemContainer: {
      width: '100%',
      overflow: 'hidden',
      backgroundColor: theme.colors.surfaceExtraBright,
    },
  });
};
