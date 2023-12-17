import { ReactElement, useCallback, useContext, useEffect, useId, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { icons } from '~assets/icons';
import { AccordionContext } from '~components/accordion/Accordion';
import { Icon } from '~components/icon/Icon';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

interface IProps {
  children?: ReactElement | ReactElement[];
  trigger?: (triggerButton: ReactElement) => ReactElement;
  title?: string;
  itemHeight?: number;
  id?: string;
}

export const AccordionItem = (props: IProps) => {
  const { trigger, title = '', children, itemHeight, id } = props;

  const autoId = useId();
  const uniqueId = id || autoId;

  const [height, setHeight] = useState(0);
  const { expandedIds, setExpandedIds, autoCollapse } = useContext(AccordionContext);
  const styles = useThemedStyles(themedStyles);

  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  let expanded = false;
  if (!autoCollapse) {
    expanded = !!expandedIds?.find(i => i === uniqueId);
  } else {
    expanded = expandedIds[0] === uniqueId;
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value,
      opacity: animatedOpacity.value,
    };
  });

  useEffect(() => {
    if (itemHeight) {
      if (Array.isArray(children)) {
        setHeight(itemHeight * children.length);
      } else {
        setHeight(itemHeight);
      }
    }
  }, [itemHeight, children]);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;
    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(Math.round(onLayoutHeight));
    }
  };

  const onPress = useCallback(() => {
    if (autoCollapse) {
      setExpandedIds(expanded ? [''] : [uniqueId]);
    } else {
      setExpandedIds(prev => {
        if (expanded) {
          return prev.filter(i => i !== uniqueId);
        } else {
          return [...prev, uniqueId];
        }
      });
    }
  }, [autoCollapse, expanded, setExpandedIds, uniqueId]);

  const icon = useMemo(
    () =>
      expanded ? (
        <Icon icon={icons.ExpandUp} onPress={onPress} color='onSurfaceExtraDim' />
      ) : (
        <Icon icon={icons.ExpandDown} onPress={onPress} color='onSurfaceExtraDim' />
      ),
    [expanded, onPress]
  );

  animatedHeight.value = expanded ? withTiming(height, { duration: 200 }) : withTiming(0);
  animatedOpacity.value = expanded ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 200 });

  return (
    <View>
      {trigger ? (
        trigger(icon)
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerContent}>{title}</Text>
          {icon}
        </View>
      )}
      <Animated.View style={[styles.collapsible, animatedStyle, { overflow: 'hidden' }]}>
        <View style={{ position: 'absolute', width: '100%' }} onLayout={itemHeight ? undefined : onLayout}>
          {children}
        </View>
      </Animated.View>
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerContent: {
      flex: 1,
      overflow: 'hidden',
    },
    icon: {
      color: theme.colors.onSurfaceExtraDim,
    },
    collapsible: {
      justifyContent: 'flex-end',
    },
  });
};
