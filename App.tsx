import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import '~i18n/i18n';

import { store } from '~redux/store';
import { RootNavigator } from '~routes/RootNavigator';
import { ThemeProvider } from '~theme/ThemeContext';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '878529743045-prlrevc1bfonrg7k4lfgvg9m0fuqtqon.apps.googleusercontent.com',
  iosClientId: '878529743045-75atqbf09t8id612juvjudp43ts3fn7u.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

SplashScreen.preventAutoHideAsync();
const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

export default function App() {
  const hide = async () => {
    await SplashScreen.hideAsync();
  };

  if (storybookEnabled) {
    const StorybookUI = require('./.storybook').default;
    hide();
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  } else {
    return (
      <SafeAreaProvider>
        <ThemeProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
              <BottomSheetModalProvider>
                <NavigationContainer>
                  <RootNavigator />
                </NavigationContainer>
              </BottomSheetModalProvider>
            </Provider>
          </GestureHandlerRootView>
        </ThemeProvider>
      </SafeAreaProvider>
    );
  }
}
