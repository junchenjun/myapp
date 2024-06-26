import React, {
  useCallback,
  useRef,
  useState,
  useImperativeHandle,
  ReactNode,
  Ref,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { NativeViewGestureHandlerProps } from 'react-native-gesture-handler';

export type ScrollPickerProps<ItemT extends string | number> = {
  data: ItemT[];
  selectedIndex?: number;
  onValueChange?: (value: ItemT, index: number) => void;
  renderItem: (data: ItemT, isSelected: boolean, index: number) => JSX.Element;
  itemHeight: number;
  wrapperHeight: number;
  scrollViewComponent?: ForwardRefExoticComponent<
    ScrollViewProps & NativeViewGestureHandlerProps & RefAttributes<ScrollView>
  >;
};

export type ScrollPickerHandle = {
  scrollToTargetIndex: (val: number) => void;
};

// https://github.com/rheng001/react-native-wheel-scrollview-picker

const ScrollPicker: {
  <ItemT extends string | number>(props: ScrollPickerProps<ItemT> & { ref?: Ref<ScrollPickerHandle> }): ReactNode;
} = React.forwardRef((propsState, ref) => {
  const { itemHeight = 30, scrollViewComponent, ...props } = propsState;
  const [selectedIndex, setSelectedIndex] = useState(
    props.selectedIndex && props.selectedIndex >= 0 ? props.selectedIndex : 0
  );
  const sView = useRef<ScrollView>(null);
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [momentumStarted, setMomentumStarted] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToTargetIndex: (index: number) => {
      setSelectedIndex(index);
      sView?.current?.scrollTo({ y: index * itemHeight });
      const selectedValue = props.data[index];
      props?.onValueChange?.(selectedValue, index);
    },
  }));

  const wrapperHeight = props.wrapperHeight;

  const renderPlaceHolder = () => {
    const h = (wrapperHeight - itemHeight) / 2;
    const header = <View style={{ height: h, flex: 1 }} />;
    const footer = <View style={{ height: h, flex: 1 }} />;
    return { header, footer };
  };

  const renderItem = (data: (typeof props.data)[0], index: number) => {
    const isSelected = index === selectedIndex;
    const item = props.renderItem(data, isSelected, index);

    return (
      <View style={[styles.itemWrapper, { height: itemHeight }]} key={index}>
        {item}
      </View>
    );
  };
  const scrollFix = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      let y = 0;
      const h = itemHeight;
      if (e.nativeEvent.contentOffset) {
        y = e.nativeEvent.contentOffset.y;
      }
      const _selectedIndex = Math.round(y / h);

      const _y = _selectedIndex * h;
      if (_y !== y) {
        // using scrollTo in ios, onMomentumScrollEnd will be invoked
        if (Platform.OS === 'ios') {
          setIsScrollTo(true);
        }
        sView?.current?.scrollTo({ y: _y });
      }
      if (selectedIndex === _selectedIndex) {
        return;
      }
      // onValueChange
      if (props.onValueChange) {
        const selectedValue = props.data[_selectedIndex];
        setSelectedIndex(_selectedIndex);
        props.onValueChange(selectedValue, _selectedIndex);
      }
    },
    [itemHeight, props, selectedIndex]
  );

  const onScrollBeginDrag = () => {
    setDragStarted(true);

    if (Platform.OS === 'ios') {
      setIsScrollTo(false);
    }
    timer && clearTimeout(timer);
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setDragStarted(false);
    // if not used, event will be garbaged
    const _e: NativeSyntheticEvent<NativeScrollEvent> = { ...e };
    timer && clearTimeout(timer);
    setTimer(
      setTimeout(() => {
        if (!momentumStarted) {
          scrollFix(_e);
        }
      }, 50)
    );
  };
  const onMomentumScrollBegin = () => {
    setMomentumStarted(true);
    timer && clearTimeout(timer);
  };

  const onMomentumScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    setMomentumStarted(false);

    if (!isScrollTo && !dragStarted) {
      scrollFix(e);
    }
  };

  const { header, footer } = renderPlaceHolder();

  const wrapperStyle: ViewStyle = {
    height: wrapperHeight,
    flex: 1,
    overflow: 'hidden',
  };

  const CustomScrollViewComponent = scrollViewComponent || ScrollView;

  // initial position
  const contentOffset = { x: 0, y: itemHeight * (props.selectedIndex || 0) };

  return (
    <View style={wrapperStyle}>
      <CustomScrollViewComponent
        ref={sView}
        bounces={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        onMomentumScrollBegin={() => onMomentumScrollBegin()}
        onMomentumScrollEnd={(e: NativeSyntheticEvent<NativeScrollEvent>) => onMomentumScrollEnd(e)}
        onScrollBeginDrag={() => onScrollBeginDrag()}
        onScrollEndDrag={(e: NativeSyntheticEvent<NativeScrollEvent>) => onScrollEndDrag(e)}
        contentOffset={contentOffset}
      >
        {header}
        {props.data.map(renderItem)}
        {footer}
      </CustomScrollViewComponent>
    </View>
  );
});
export default ScrollPicker;

const styles = StyleSheet.create({
  itemWrapper: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
