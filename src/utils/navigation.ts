import { router } from 'expo-router';
import { Keyboard, Platform } from 'react-native';

export const dismissKeyboardBeforeNavigate = (route: string) => {
  Keyboard.dismiss();
  if (Platform.OS === 'android') {
    setTimeout(() => {
      router.push(route);
    }, 25);
  } else {
    router.push(route);
  }
};
