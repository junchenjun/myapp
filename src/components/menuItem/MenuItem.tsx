import { StyleSheet, View } from 'react-native';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IDefaultMenuItem {
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
  disabledOnPress?: boolean;
  iosScaleDownAnimation?: boolean;
  color?: 'default' | 'primaryInverse' | 'primary';
  size?: 'lg' | 'sm';
}

type IMenuItem = IDefaultMenuItem;

export const MenuItem = (props: IMenuItem) => {
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
    disabledOnPress,
    iosScaleDownAnimation,
    color = 'default',
    size = 'lg',
  } = props;

  const styles = useThemedStyles(themedStyles({ iosScaleDownAnimation, color, size }));

  let titleColor: keyof ITheme['colors'] = danger ? 'error' : 'onSurface';
  let descColor: keyof ITheme['colors'] = danger ? 'error' : 'onSurfaceExtraDim';
  let iconLeftColor: keyof ITheme['colors'] = danger ? 'error' : 'onSurfaceDim';
  let iconRightColor: keyof ITheme['colors'] = danger ? 'error' : 'onSurfaceExtraDim';

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
        iosScaleDownAnimation={iosScaleDownAnimation}
        disabled={disabled}
        disabledOnPress={disabledOnPress}
        onPress={onPress}
        style={styles.pressable}
        rippleConfig={{ borderless: false, disabled: false }}
      >
        {(iconLeft || title) && (
          <View style={styles.left}>
            {iconLeft && <Icon icon={iconLeft} color={iconLeftColor} />}
            {title && (
              <View>
                <Text text={title} color={titleColor} />
                {desc && <Text text={desc} variant='pXSRegular' color={descColor} />}
              </View>
            )}
          </View>
        )}
        {iconRight && <Icon onPress={onRightIconPress} icon={iconRight} color={iconRightColor} />}
      </Pressable>
    </View>
  );
};

const themedStyles = ({
  iosScaleDownAnimation,
  color,
  size,
}: {
  iosScaleDownAnimation?: IDefaultMenuItem['iosScaleDownAnimation'];
  color: IDefaultMenuItem['color'];
  size: IDefaultMenuItem['size'];
}) => {
  const styles = (theme: ITheme) => {
    const backgroundColor = color === 'primary' ? theme.colors['primary'] : theme.colors.surfaceExtraBright;

    return StyleSheet.create({
      container: {
        overflow: 'hidden',
        backgroundColor: iosScaleDownAnimation ? '' : backgroundColor,
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
