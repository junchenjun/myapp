import { StyleSheet, View } from 'react-native';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import { ITheme, IThemeColorKeys, useThemedStyles } from '~theme/ThemeContext';

export type IListItemProps = {
  title?: string;
  desc?: string;
  iconLeft?: IIcon;
  iconRight?: IIcon;
  danger?: boolean;
  roundedTopCorners?: boolean;
  roundedBottomCorners?: boolean;
  withBorder?: boolean;
  onPress?: () => void;
  onRightIconPress?: () => void;
  disabled?: boolean;
  color?: 'default' | 'primaryInverse' | 'primary';
  size?: 'lg' | 'sm';
};

export const ListItem = (props: IListItemProps) => {
  const {
    title,
    desc,
    disabled,
    onPress,
    onRightIconPress,
    iconLeft,
    iconRight,
    danger,
    roundedTopCorners,
    roundedBottomCorners,
    withBorder,
    color = 'default',
    size = 'lg',
  } = props;

  const styles = useThemedStyles(themedStyles({ color, size }));

  let titleColor: IThemeColorKeys = danger ? 'error' : 'onSurface';
  let descColor: IThemeColorKeys = danger ? 'error' : 'onSurfaceExtraDim';
  let iconLeftColor: IThemeColorKeys = danger ? 'error' : 'onSurfaceDim';
  let iconRightColor: IThemeColorKeys = danger ? 'error' : 'onSurfaceExtraDim';

  if (color === 'primaryInverse') {
    titleColor = 'primary';
    descColor = 'primary';
    iconLeftColor = 'primary';
    iconRightColor = 'primary';
  }
  if (color === 'primary') {
    titleColor = 'onPrimary';
    descColor = 'onPrimary';
    iconLeftColor = 'onPrimary';
    iconRightColor = 'onPrimary';
  }

  return (
    <View
      style={[
        styles.container,
        roundedTopCorners && styles.roundedTopCorners,
        roundedBottomCorners && styles.roundedBottomCorners,
        withBorder && styles.withBorder,
      ]}
    >
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.pressable,
          roundedTopCorners && styles.roundedTopCorners,
          roundedBottomCorners && styles.roundedBottomCorners,
        ]}
      >
        {(iconLeft || title) && (
          <View style={styles.left}>
            {iconLeft && <Icon icon={iconLeft} colorKey={iconLeftColor} />}
            {title && (
              <View style={iconRight && { paddingRight: 24 }}>
                <Text text={title} colorKey={titleColor} />
                {desc && <Text text={desc} variant='pXSRegular' colorKey={descColor} />}
              </View>
            )}
          </View>
        )}
        {iconRight && <Icon onPress={onRightIconPress} icon={iconRight} colorKey={iconRightColor} />}
      </Pressable>
    </View>
  );
};

const themedStyles = ({ color, size }: { color: IListItemProps['color']; size: IListItemProps['size'] }) => {
  const styles = (theme: ITheme) => {
    const backgroundColor = color === 'primary' ? theme.colors['primary'] : theme.colors.surfaceExtraBright;

    return StyleSheet.create({
      container: {
        width: '100%',
        overflow: 'hidden',
      },
      pressable: {
        backgroundColor,
        flexDirection: 'row',
        gap: theme.spacing[3],
        padding: size === 'lg' ? theme.spacing[4] : theme.spacing[3],
        alignItems: 'center',
      },
      left: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        gap: theme.spacing[3],
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
    });
  };
  return styles;
};
