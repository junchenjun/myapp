import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ThemeProvider as RNThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import * as SystemUI from 'expo-system-ui';
import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider, initialWindowMetrics } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { collections, firebaseAuth, firebaseStore } from '~firebase/firebaseConfig';
import { setAuth } from '~redux/authSlice';
import { IFolder, setFolders } from '~redux/foldersSlice';
import { store, useAppDispatch, useAppSelector } from '~redux/store';
import { IAppColorScheme, ThemeProvider, appColorScheme, useTheme } from '~theme/ThemeContext';
import { useUpdateAppColorScheme } from '~utils/hooks/useUpdateAppColorScheme';
import { getSecureStoreValue, secureStoreKeys } from '~utils/secureStore';

SplashScreen.preventAutoHideAsync();
const storybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === 'true';

const RootLayout = ({ loaded }: { loaded: boolean }) => {
  const [initializing, setInitializing] = useState(true);
  const [splashHidden, setSplashHidden] = useState(false);

  const theme = useTheme();
  const auth = useAppSelector(state => state.auth);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const updateAppColorScheme = useUpdateAppColorScheme();

  const isAppReady = loaded && !initializing;
  const systemBackgroundColor = theme.colors.surfaceExtraDim;

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(systemBackgroundColor);
  }, [systemBackgroundColor]);

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

  useEffect(() => {
    const getSavedColorscheme = async () => {
      const result = await getSecureStoreValue<IAppColorScheme>(secureStoreKeys.colorscheme);
      updateAppColorScheme(result);
    };
    getSavedColorscheme();
  }, [updateAppColorScheme]);

  useEffect(() => {
    if (!auth.authed && isAppReady) {
      router.replace('auth');
    }
  }, [auth.authed, isAppReady, router]);

  useEffect(() => {
    if (Platform.OS === 'android' && splashHidden) {
      NavigationBar.setBackgroundColorAsync(theme.colors.surface);
      NavigationBar.setBorderColorAsync(theme.colors.surface);
    }
  }, [splashHidden, theme.colors.surface]);

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

        firebaseStore()
          .collection(collections.user.name)
          .doc(user.uid)
          .collection(collections.user.subCollections.plan.name)
          .onSnapshot(snapshot => {
            const data = [] as IFolder[];
            snapshot.forEach(doc => {
              data.push({ ...doc.data(), id: doc.id } as IFolder);
            });
            dispatch(setFolders(data));
          });
      } else {
        dispatch(setAuth());
        dispatch(setFolders());
      }
      setInitializing(false);
    });
    return subscriber;
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  const navTheme = {
    dark: theme.id === appColorScheme.dark,
    colors: {
      primary: theme.colors.primary,
      card: theme.colors.surfaceExtraDim,
      text: theme.colors.onPrimary,
      border: theme.colors.outlineDim,
      notification: theme.colors.primary,
      background: theme.colors.surfaceExtraDim,
    },
  };

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <RNThemeProvider value={navTheme}>
        <BottomSheetModalProvider>
          <Slot />
        </BottomSheetModalProvider>
      </RNThemeProvider>
    </SafeAreaProvider>
  );
};

export default function Root() {
  const [loaded] = useFonts({
    'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
    'Kanit-Light': require('../assets/fonts/Kanit-Light.ttf'),
    'Kanit-LightItalic': require('../assets/fonts/Kanit-LightItalic.ttf'),
  });

  let EntryPoint = (
    <Provider store={store}>
      <ThemeProvider>
        <RootLayout loaded={loaded} />
      </ThemeProvider>
    </Provider>
  );

  const hide = async () => {
    await SplashScreen.hideAsync();
  };

  if (storybookEnabled && loaded) {
    const StorybookUI = require('../../.storybook').default;
    EntryPoint = (
      <View style={{ flex: 1 }}>
        <StorybookUI />
      </View>
    );
    hide();
  }
  return EntryPoint;
}
