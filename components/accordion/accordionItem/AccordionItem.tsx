import { ReactElement, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { IconExpandDown } from '~assets/icons/IconExpandDown';
import { IconExpandUp } from '~assets/icons/IconExpandUp';
import { AccordionContext } from '~components/accordion/Accordion';
import { Card } from '~components/card/Card';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';
import { ITheme, useThemedStyles } from '~utils/ThemeContext';

interface IProps {
  id: string;
  children?: ReactElement | ReactElement[];
  renderTitle?: (expandIcon: ReactElement) => ReactElement;
  title?: string;
  itemHeight?: number;
}

export const AccordionItem = (props: IProps) => {
  const { renderTitle, title = '', children, id, itemHeight } = props;

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
    expanded = !!expandedIds?.find(i => i === id);
  } else {
    expanded = expandedIds[0] === id;
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
      setExpandedIds(expanded ? [''] : [id]);
    } else {
      setExpandedIds(prev => {
        if (expanded) {
          return prev.filter(i => i !== id);
        } else {
          return [...prev, id];
        }
      });
    }
  }, [autoCollapse, expanded, id]);

  const Icon = useMemo(
    () =>
      expanded ? (
        <IconExpandUp width={30} height={30} stroke={styles.icon.color} />
      ) : (
        <IconExpandDown width={30} height={30} stroke={styles.icon.color} />
      ),
    [expanded]
  );

  return (
    <Card>
      {renderTitle ? (
        renderTitle(<Pressable onPress={onPress}>{Icon}</Pressable>)
      ) : (
        <View style={styles.header}>
          <Text style={styles.headerContent}>{title}</Text>
          <Pressable onPress={onPress}>{Icon}</Pressable>
        </View>
      )}
      <Animated.View style={[styles.collapsible, animatedStyle, { overflow: 'hidden' }]}>
        <View style={{ position: 'absolute' }} onLayout={itemHeight ? undefined : onLayout}>
          {children}
        </View>
      </Animated.View>
    </Card>
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
      color: theme.colors.onSurfaceDim,
    },
    collapsible: {
      justifyContent: 'flex-end',
    },
  });
};
