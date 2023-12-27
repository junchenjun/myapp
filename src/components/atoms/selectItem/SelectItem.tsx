import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { IIcon, icons } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ICommonProps {
  onPress?: () => void;
  title?: string;
  selected?: boolean;
  disabled?: boolean;
}

interface ISmallSelectItemProps extends ICommonProps {
  variant: 'small';
}

interface ILargeSelectItemProps extends ICommonProps {
  variant: 'large';
  icon?: IIcon;
}

export type ISelectItemProps = ILargeSelectItemProps | ISmallSelectItemProps;

export const SelectItem = (props: ISelectItemProps) => {
  const { onPress, title, selected, variant, disabled } = props;
  const styles = useThemedStyles(themedStyles);

  if (variant === 'large') {
    const { icon } = props;
    return (
      <View style={styles.container}>
        <Pressable
          iosScaleDownAnimation
          rippleConfig={{
            borderless: false,
          }}
          disabled={disabled}
          onPress={onPress}
          style={[styles.pressable, selected && styles.selected]}
        >
          <View style={styles.left}>
            {icon && <Icon icon={icon} colorKey={selected ? 'primary' : 'onSurfaceDim'} />}
            <Text text={title} colorKey={selected ? 'primary' : 'onSurface'} />
          </View>
          <Icon
            size={22}
            icon={selected ? icons.Checked : icons.Unchecked}
            colorKey={selected ? 'primary' : 'outline'}
            fill={selected ? 'primary' : 'surfaceBright'}
          />
        </Pressable>
      </View>
    );
  } else if (variant === 'small') {
    return (
      <View style={[styles.container, styles.smallContainer]}>
        <Pressable
          iosScaleDownAnimation
          rippleConfig={{
            borderless: false,
          }}
          disabled={disabled}
          onPress={onPress}
          style={[styles.pressable, styles.smallPressable, selected && styles.smallSelected]}
        >
          <Text text={title} variant='pMDRegular' colorKey={selected ? 'onPrimary' : 'onSurfaceDim'} />
        </Pressable>
      </View>
    );
  }
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      borderRadius: theme.radius.md,
      alignSelf: 'center',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      width: '100%',
    },
    smallContainer: {
      borderRadius: theme.radius.sm,
      width: 'auto',
    },
    pressable: {
      flexDirection: 'row',
      padding: theme.spacing[4],
      gap: theme.spacing[2],
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.radius.md,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surfaceExtraBright,
    },
    smallPressable: {
      paddingVertical: theme.spacing[2],
      borderRadius: theme.radius.sm,
      borderColor: theme.colors.surfaceDim,
      backgroundColor: theme.colors.surfaceDim,
    },
    selected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.surfaceExtraBright,
    },
    smallSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primary,
    },
    left: {
      flexDirection: 'row',
      gap: theme.spacing[2],
      flex: 1,
    },
  });
};
