import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { IIcon, icons } from '~assets/icons';
import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface ICommonProps {
  onPress?: () => void;
  title?: string;
  selected?: boolean;
}

interface ISmallSelectButton extends ICommonProps {
  variant?: 'small';
}

interface ILargeSelectButton extends ICommonProps {
  variant?: 'large';
  icon: IIcon;
}

type IButton = ILargeSelectButton | ISmallSelectButton;

export const SelectButton = (props: IButton) => {
  const { onPress, title, selected, variant = 'large' } = props;
  const styles = useThemedStyles(themedStyles);

  if (variant === 'large') {
    const { icon } = props as ILargeSelectButton;
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
