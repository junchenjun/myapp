import { Keyboard, Platform } from 'react-native';

export const dismissKeyboardBeforeAction = (action: () => void) => {
  Keyboard.dismiss();
  if (Platform.OS === 'android' && Keyboard.isVisible()) {
    setTimeout(() => {
      action();
    }, 35);
  } else {
    action();
  }
};
