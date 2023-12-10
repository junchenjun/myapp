import { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { Icon } from '~components/icon/Icon';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

// interface IPageHeader {
//   title?: string;
//   rightIcon?: React.FC<SvgProps>;
//   leftIcon?: React.FC<SvgProps>;
//   leftComponent?: ReactElement;
//   rightComponent?: ReactElement;
//   onPress?: () => void;
// }

interface IHeader {
  type: 'default';
  title?: string;
}

interface IHeaderWithActions {
  type: 'actionHeader';
  title?: string;
  left?: {
    icon?: React.FC<SvgProps>;
    component?: ReactElement;
    onPress?: () => void;
  };
  right?: {
    icon?: React.FC<SvgProps>;
    component?: ReactElement;
    onPress?: () => void;
  };
}

type IPageHeader = IHeader | IHeaderWithActions;

export const PageHeader = (props: IPageHeader) => {
  const { title, type } = props;
  const styles = useThemedStyles(themedStyles);

  if (type === 'actionHeader') {
    const { left, right } = props;
    const componentLeft = left?.icon ? (
      <Pressable onPress={left.onPress} style={{ width: 24 }} rippleStyle='light'>
        <Icon icon={left.icon} color='onSurface' />
      </Pressable>
    ) : (
      left?.component
    );
    const componentRight = right?.icon ? (
      <Pressable onPress={right.onPress} style={{ width: 24 }} rippleStyle='light'>
        <Icon icon={right.icon} color='onSurface' />
      </Pressable>
    ) : (
      right?.component
    );

    return (
      <View style={styles.container}>
        <View style={styles.left}>{left?.icon || left?.component ? componentLeft : null}</View>
        {title && <Text color='onSurfaceDim'>{title}</Text>}
        <View style={styles.right}>{right?.icon || right?.component ? componentRight : null}</View>
      </View>
    );
  } else if (type === 'default') {
    return (
      <View style={styles.container}>
        {title && (
          <Text type='h4Medium' color='onSurface'>
            {title}
          </Text>
        )}
      </View>
    );
  }
};

const themedStyles = (theme: ITheme, insets: EdgeInsets) => {
  const paddingTop = insets.top < 40 ? 40 : insets.top;
  // const height = paddingTop + 50;
  return StyleSheet.create({
    container: {
      padding: theme.spacing[4],
      paddingBottom: theme.spacing[3],
      paddingTop,
      alignItems: 'flex-end',
      flexDirection: 'row',
      gap: theme.spacing[1],
      // height,
      overflow: 'hidden',
      position: 'relative',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.surfaceExtraDim,
    },
    left: {
      width: 60,
      flex: 1,
    },
    right: {
      width: 60,
      flex: 1,
      alignItems: 'flex-end',
    },
  });
};
