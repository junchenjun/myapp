import { Keyboard, Platform } from 'react-native';

export const dismissKeyboardBeforeAction = (action: () => void) => {
  if (Platform.OS === 'android' && Keyboard.isVisible()) {
    Keyboard.dismiss();
    setTimeout(() => {
      action();
    }, 35);
  } else {
    action();
  }
};
