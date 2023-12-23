import React, {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import { LayoutChangeEvent, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { Card } from '~components/atoms/card/Card';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { ITheme, useThemedStyles } from '~theme/ThemeContext';

export interface IAccordionProps {
  children?: ReactElement<IAccordionItemProps> | ReactElement<IAccordionItemProps>[];
  style?: StyleProp<ViewStyle>;
  autoCollapse?: boolean;
  expandedIds?: string[];
  styled?: boolean;
}

interface IAccordionContextContextType {
  expandedIds: string[];
  setExpandedIds: Dispatch<SetStateAction<string[]>>;
  autoCollapse: boolean;
  styled: boolean;
}

const AccordionContext = createContext<IAccordionContextContextType>({
  expandedIds: [''],
  setExpandedIds: () => '',
  autoCollapse: false,
  styled: true,
});

const AccordionItemContext = createContext<{ open: boolean; toggle: () => void }>({
  open: false,
  toggle: () => null,
});

interface IAccordionItemProps {
  children?:
    | ReactElement<IAccordionTriggerProps | IAccordionContentProps>
    | ReactElement<IAccordionTriggerProps | IAccordionContentProps>[];
  id?: string;
  style?: StyleProp<ViewStyle>;
}

interface IAccordionTriggerProps {
  children: (({ open }: { open: boolean; toggle: () => void }) => ReactNode) | ReactNode | ReactNode[];
}

interface IAccordionContentProps {
  children: ReactNode | ReactNode[];
}

const Accordion = (props: IAccordionProps) => {
  const { children, autoCollapse, expandedIds: defaultIds, style, styled = true } = props;
  const [expandedIds, setExpandedIds] = useState<string[]>([]);

  const styles = useThemedStyles(themedStyles);

  useEffect(() => {
    defaultIds && setExpandedIds(defaultIds);
  }, [defaultIds]);

  return (
    <AccordionContext.Provider
      value={{
        expandedIds,
        autoCollapse: !!autoCollapse,
        setExpandedIds,
        styled,
      }}
    >
      <View style={[styled && styles.container, style]}>{children}</View>
    </AccordionContext.Provider>
  );
};

const AccordionItem = (props: IAccordionItemProps) => {
  const { children, id, style } = props;

  const autoId = useId();
  const uniqueId = id || autoId;

  const [height, setHeight] = useState(0);
  const { expandedIds, setExpandedIds, autoCollapse, styled } = useContext(AccordionContext);
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

  animatedHeight.value = expanded ? withTiming(height, { duration: 200 }) : withTiming(0);
  animatedOpacity.value = expanded ? withTiming(1, { duration: 500 }) : withTiming(0, { duration: 200 });

  const trigger = React.Children.toArray(children).filter(
    child =>
      React.isValidElement(child) &&
      (child as unknown as { type: { displayName: string } }).type.displayName === Accordion.Trigger.name
  );
  const content = React.Children.toArray(children).filter(
    child =>
      React.isValidElement(child) &&
      (child as unknown as { type: { displayName: string } }).type.displayName === Accordion.Content.name
  );

  const unStyled = (
    <>
      {trigger}
      <Animated.View style={[styles.collapsible, animatedStyle, { overflow: 'hidden' }]}>
        <View style={{ position: 'absolute', width: '100%' }} onLayout={onLayout}>
          {content}
        </View>
      </Animated.View>
    </>
  );

  const withCard = <Card style={style}>{unStyled}</Card>;
  const withoutCard = <View style={style}>{unStyled}</View>;

  return (
    <AccordionItemContext.Provider value={{ open: expanded, toggle: onPress }}>
      {styled ? withCard : withoutCard}
    </AccordionItemContext.Provider>
  );
};

const AccordionTrigger: React.FC<IAccordionTriggerProps> = ({ children }) => {
  const { open, toggle } = useContext(AccordionItemContext);

  if (typeof children === 'function') {
    return children({ open, toggle });
  } else {
    return <Pressable onPress={toggle}>{children}</Pressable>;
  }
};

const AccordionContent: React.FC<IAccordionContentProps> = ({ children }) => <>{children}</>;

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      gap: theme.spacing[3],
    },
    collapsible: {
      justifyContent: 'flex-end',
    },
  });
};

AccordionItem.displayName = 'AccordionItem';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';

Accordion.Item = AccordionItem;
Accordion.Trigger = AccordionTrigger;
Accordion.Content = AccordionContent;

export { Accordion };
