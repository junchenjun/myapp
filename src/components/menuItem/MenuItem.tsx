import { StyleSheet, View } from 'react-native';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IMenuItemProps {
  title: string;
  desc?: string;
  iconLeft?: IIcon;
  iconRight?: IIcon;
  danger?: boolean;
  roundedTopCorners?: boolean;
  roundedBottomCorners?: boolean;
  withBorder?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  disabledOnPress?: boolean;
  iosScaleDownAnimation?: boolean;
}

export const MenuItem = (props: IMenuItemProps) => {
  const {
    title,
    desc,
    disabled,
    onPress,
    iconLeft,
    iconRight,
    danger,
    roundedTopCorners,
    roundedBottomCorners,
    withBorder,
    disabledOnPress,
    iosScaleDownAnimation,
  } = props;

  const styles = useThemedStyles(themedStyles({ iosScaleDownAnimation }));

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
        style={[styles.pressable]}
        rippleConfig={{ borderless: false }}
      >
        <View style={styles.left}>
          {iconLeft && <Icon icon={iconLeft} color={danger ? 'error' : 'onSurfaceDim'} />}
          <View>
            <Text text={title} color={danger ? 'error' : 'onSurface'} />
            {desc && <Text text={desc} variant='pXSRegular' color={danger ? 'error' : 'onSurfaceExtraDim'} />}
          </View>
        </View>
        {iconRight && <Icon icon={iconRight} color={danger ? 'error' : 'onSurfaceExtraDim'} />}
      </Pressable>
    </View>
  );
};

const themedStyles = ({ iosScaleDownAnimation }: { iosScaleDownAnimation?: boolean }) => {
  const styles = (theme: ITheme) => {
    return StyleSheet.create({
      container: {
        width: '100%',
        overflow: 'hidden',
        backgroundColor: iosScaleDownAnimation ? '' : theme.colors.surfaceExtraBright,
      },
      pressable: {
        backgroundColor: theme.colors.surfaceExtraBright,
        flexDirection: 'row',
        gap: theme.spacing[3],
        padding: theme.spacing[4],
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
