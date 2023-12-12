import { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Modal as RNModal, View, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS } from 'react-native-reanimated';

interface IProps {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children?: ReactElement | ReactElement[];
}

export const Modal = (props: IProps) => {
  const { isActive, setIsActive, children } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    isActive && setIsModalVisible(isActive);
  }, [isActive]);

  return (
    <RNModal transparent animationType='none' statusBarTranslucent visible={isActive}>
      {isModalVisible && (
        <>
          <Animated.View style={styles.backdrop} entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)} />
          <Animated.View
            style={styles.modal}
            entering={SlideInDown.duration(300)}
            exiting={SlideOutDown.duration(300).withCallback(() => {
              'worklet';
              runOnJS(setIsActive)(false);
            })}
          >
            <View style={styles.empty} onTouchEnd={() => setIsModalVisible(false)} />
            {children}
          </Animated.View>
        </>
      )}
    </RNModal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    width: '100%',
    position: 'absolute',
    flex: 1,
    height: Dimensions.get('screen').height,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  modal: {
    width: '100%',
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  empty: {
    flex: 1,
    width: '100%',
  },
});
