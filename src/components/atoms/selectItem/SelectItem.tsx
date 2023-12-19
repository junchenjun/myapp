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
  const { onPress, title, selected, variant } = props;
  const styles = useThemedStyles(themedStyles);

  if (variant === 'large') {
    const { icon } = props;
    return (
      <View style={styles.largeButton}>
        <Pressable
          iosScaleDownAnimation
          rippleConfig={{
            borderless: false,
          }}
          onPress={onPress}
          style={[styles.pressable, selected && styles.selected]}
        >
          <View style={styles.left}>
            {icon && <Icon icon={icon} colorKey={selected ? 'primary' : 'onSurfaceExtraDim'} />}
            <Text text={title} colorKey={selected ? 'primary' : 'onSurfaceDim'} />
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
  } else {
    return null;
  }
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    largeButton: {
      borderRadius: theme.radius.lg,
      alignSelf: 'center',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      width: '100%',
    },
    pressable: {
      flexDirection: 'row',
      padding: theme.spacing[4],
      gap: theme.spacing[2],
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.radius.lg,
      borderColor: theme.colors.outlineDim,
      backgroundColor: theme.colors.surfaceBright,
    },
    selected: {
      borderColor: theme.colors.primary,
      backgroundColor: theme.colors.primaryContainer,
    },
    left: {
      flexDirection: 'row',
      gap: theme.spacing[2],
      flex: 1,
    },
  });
};
