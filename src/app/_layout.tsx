import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect, useState } from 'react';
import { Appearance, Platform, View, useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { collections, firebaseAuth, firebaseStore } from '~firebase/firebaseConfig';
import { setAuth } from '~redux/authSlice';
import { IFolder, setFolders } from '~redux/foldersSlice';
import { store, useAppDispatch, useAppSelector } from '~redux/store';
import { IAppColorScheme, ThemeProvider, appColorScheme, useTheme, useUpdateTheme } from '~theme/ThemeContext';
import { getSecureStoreValue, secureStoreKeys } from '~utils/secureStore';
import '~i18n/i18n';

SplashScreen.preventAutoHideAsync();
const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

const Root = () => {
  const [initializing, setInitializing] = useState(true);
  const [splashHidden, setSplashHidden] = useState(false);

  const theme = useTheme();
  const colorScheme = useColorScheme();
  const auth = useAppSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const updateTheme = useUpdateTheme();

  const isAppReady = !initializing;

  // splash screen
  useEffect(() => {
    if (isAppReady) {
      const hide = async () => {
        await SplashScreen.hideAsync();
        setSplashHidden(true);
      };
      const timer = setTimeout(() => hide(), 1 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAppReady]);

  // auth redirect
  useEffect(() => {
    if (!auth.authed && isAppReady) {
      router.replace('auth');
    }
  }, [auth.authed, isAppReady, router]);

  // themes and colors
  useEffect(() => {
    const getSavedColorscheme = async () => {
      const v = await getSecureStoreValue<IAppColorScheme>(secureStoreKeys.colorscheme);
      if (!v) {
        if (colorScheme === 'light') {
          updateTheme(appColorScheme.light, true);
          setStatusBarStyle('dark');
        } else {
          updateTheme(appColorScheme.dark, true);
          setStatusBarStyle('light');
        }
      } else {
        if (v === appColorScheme.dark) {
          updateTheme(appColorScheme.dark, false);
          setStatusBarStyle('light');
        } else if (v === appColorScheme.light) {
          updateTheme(appColorScheme.light, false);
          setStatusBarStyle('dark');
        }
      }
    };
    getSavedColorscheme();
  }, [colorScheme, updateTheme]);

  useEffect(() => {
    if (theme.systemDefault) {
      Appearance.setColorScheme(null);
    } else {
      if (theme.id === appColorScheme.dark) {
        Appearance.setColorScheme('dark');
      } else if (theme.id === appColorScheme.light) {
        Appearance.setColorScheme('light');
      }
    }
  }, [theme.id, theme.systemDefault]);

  useEffect(() => {
    if (Platform.OS === 'android' && splashHidden) {
      NavigationBar.setBackgroundColorAsync(theme.colors.surface);
      NavigationBar.setBorderColorAsync(theme.colors.surface);
      SystemUI.setBackgroundColorAsync(theme.colors.surfaceExtraDim);
    }
  }, [splashHidden, theme.colors.surface, theme.colors.surfaceExtraDim]);

  // onAuthStateChanged
  useEffect(() => {
    const subscriber = firebaseAuth().onAuthStateChanged(async (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        const userInfo = {
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          providerId: user.providerId,
          uid: user.uid,
        };
        dispatch(setAuth(userInfo));
      } else {
        dispatch(setAuth());
        dispatch(setFolders());
      }
      setInitializing(false);
    });
    return () => subscriber();
  }, [dispatch]);

  // onSnapshot
  useEffect(() => {
    const subscriber = firebaseStore()
      .collection(collections.user.name)
      .doc(auth.user?.uid)
      .collection(collections.user.subCollections.plan.name)
      .onSnapshot(snapshot => {
        const data = [] as IFolder[];
        snapshot.forEach(doc => {
          data.push({ ...doc.data(), id: doc.id } as IFolder);
        });
        dispatch(setFolders(data));
      });
    return () => subscriber();
  }, [auth.user?.uid, dispatch]);

  return <Slot />;
};

export default function App() {
  const hide = async () => {
    await SplashScreen.hideAsync();
  };

  if (storybookEnabled) {
    const StorybookUI = require('../../.storybook').default;
    hide();
    return (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <ThemeProvider>
            <Provider store={store}>
              <BottomSheetModalProvider>
                <Root />
              </BottomSheetModalProvider>
            </Provider>
          </ThemeProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}
