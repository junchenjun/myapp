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
    return (
      <View style={[styles.largeButton, selected && styles.selected]}>
        <Pressable
          rippleConfig={{
            borderless: false,
            // disabled: true,
          }}
          onPress={onPress}
          style={[styles.pressable]}
        >
          <View style={styles.left}>
            {(props as ILargeSelectButton).icon && (
              <Icon icon={(props as ILargeSelectButton).icon} color={selected ? 'primary' : 'onSurfaceExtraDim'} />
            )}
            <Text text={title} color={selected ? 'primary' : 'onSurfaceDim'} />
          </View>
          <Icon icon={icons.Activity} color={selected ? 'primary' : 'outline'} />
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
      backgroundColor: theme.colors.surfaceBright,
      alignSelf: 'center',
      overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: theme.colors.outlineDim,
      width: '100%',
    },
    pressable: {
      flexDirection: 'row',
      padding: theme.spacing[4],
      gap: theme.spacing[2],
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
