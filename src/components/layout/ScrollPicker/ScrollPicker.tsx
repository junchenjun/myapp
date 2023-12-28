import React, {
  useCallback,
  useEffect,
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
  dataSource: ItemT[];
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

const ScrollPicker: {
  <ItemT extends string | number>(props: ScrollPickerProps<ItemT> & { ref?: Ref<ScrollPickerHandle> }): ReactNode;
} = React.forwardRef((propsState, ref) => {
  const { itemHeight = 30, scrollViewComponent, ...props } = propsState;
  const [initialized, setInitialized] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(
    props.selectedIndex && props.selectedIndex >= 0 ? props.selectedIndex : 0
  );
  const sView = useRef<ScrollView>(null);
  const [isScrollTo, setIsScrollTo] = useState(false);
  const [dragStarted, setDragStarted] = useState(false);
  const [momentumStarted, setMomentumStarted] = useState(false);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useImperativeHandle(ref, () => ({
    scrollToTargetIndex: (val: number) => {
      setSelectedIndex(val);
      sView?.current?.scrollTo({ y: val * itemHeight });
    },
  }));

  const wrapperHeight = props.wrapperHeight;
  useEffect(
    function initialize() {
      if (initialized) return;
      setInitialized(true);

      setTimeout(() => {
        const y = itemHeight * selectedIndex;
        sView?.current?.scrollTo({ y });
      }, 0);

      return () => {
        timer && clearTimeout(timer);
      };
    },
    [initialized, itemHeight, selectedIndex, sView, timer]
  );

  const renderPlaceHolder = () => {
    const h = (wrapperHeight - itemHeight) / 2;
    const header = <View style={{ height: h, flex: 1 }} />;
    const footer = <View style={{ height: h, flex: 1 }} />;
    return { header, footer };
  };

  const renderItem = (data: (typeof props.dataSource)[0], index: number) => {
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
        const selectedValue = props.dataSource[_selectedIndex];
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
      >
        {header}
        {props.dataSource.map(renderItem)}
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
