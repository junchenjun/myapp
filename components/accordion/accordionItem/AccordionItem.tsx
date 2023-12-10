import { ReactElement, useCallback, useContext, useEffect, useId, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { IconExpandDown } from '~assets/icons/IconExpandDown';
import { IconExpandUp } from '~assets/icons/IconExpandUp';
import { AccordionContext } from '~components/accordion/Accordion';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  children?: ReactElement | ReactElement[];
  trigger?: (expandIcon: ReactElement) => ReactElement;
  title?: string;
  itemHeight?: number;
  id?: string;
}

export const AccordionItem = (props: IProps) => {
  const { trigger, title = '', children, itemHeight, id } = props;

  const autoId = useId();

  const uniqueId = id || autoId;

  const { expandedIds, setExpandedIds, autoCollapse } = useContext(AccordionContext);

  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const animatedOpacity = useSharedValue(0);

  const styles = useThemedStyles(themedStyles);

  useEffect(() => {
    if (itemHeight) {
      if (Array.isArray(children)) {
        setHeight(itemHeight * children.length);
      } else {
        setHeight(itemHeight);
      }
    }
  }, [itemHeight, children]);

  let expanded = false;

  if (!autoCollapse) {
    expanded = !!expandedIds?.find(i => i === uniqueId);
  } else {
    expanded = expandedIds[0] === uniqueId;
  }

  const animatedStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height, { duration: 200 }) : withTiming(0);
    animatedOpacity.value = expanded ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 200 });

    return {
      height: animatedHeight.value,
      opacity: animatedOpacity.value,
    };
  }, [expanded, height]);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;
    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(Math.round(onLayoutHeight + 8));
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
  }, [autoCollapse, expanded, uniqueId]);

  const Icon = useMemo(
    () =>
      expanded ? (
        <IconExpandUp width={24} height={24} stroke={styles.icon.color} />
      ) : (
        <IconExpandDown width={24} height={24} stroke={styles.icon.color} />
      ),
    [expanded]
  );

  return (
    <View>
      {trigger ? (
        trigger(
          <Pressable rippleConfig={{ radius: 24 }} onPress={onPress}>
            {Icon}
          </Pressable>
        )
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerContent}>{title}</Text>
          <Pressable onPress={onPress} rippleConfig={{ radius: 24 }}>
            {Icon}
          </Pressable>
        </View>
      )}
      <Animated.View style={[styles.collapsible, animatedStyle, { overflow: 'hidden' }]}>
        <View style={{ position: 'absolute' }} onLayout={itemHeight ? undefined : onLayout}>
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
