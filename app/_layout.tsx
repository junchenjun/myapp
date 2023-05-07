import { configureStore } from '@reduxjs/toolkit';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { SplashScreen, Stack, useRouter, useSegments } from 'expo-router';
import { User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { Platform, View, useColorScheme } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { Header } from '../components/layout/Header';
import { auth } from '../firebase/firebaseConfig';
import { setUserInfo } from '../redux/authSlice';
import { rootReducer } from '../redux/reducer';
import { DARK_THEME_ID, LIGHT_THEME_ID, setTheme } from '../redux/themeSlice';

export type RootState = ReturnType<typeof store.getState>;

const RootLayout = () => {
  const [initializing, setInitializing] = useState(true);

  const user = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.theme);
  const colorScheme = useColorScheme();

  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (colorScheme === 'light') {
      dispatch(setTheme(LIGHT_THEME_ID));
    } else {
      dispatch(setTheme(DARK_THEME_ID));
    }
  }, [colorScheme]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.styles.color.surface200);
    }
  }, [theme.themeId]);

  useEffect(() => {
    if (!initializing) {
      const inAuthGroup = segments[0] === '(auth)';

      if (!user.userInfo && !inAuthGroup) {
        router.replace('/SignIn');
      } else if (user.userInfo && inAuthGroup) {
        router.replace('/');
      }
    }
  }, [user.userInfo, segments, initializing]);

  const onAuthStateChanged = (user: User) => {
    console.log('auth:', user);
    if (user) {
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid,
      };
      dispatch(setUserInfo(userInfo));
    } else {
      dispatch(setUserInfo(null));
    }

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'fade_from_bottom',
        contentStyle: {
          backgroundColor: theme.styles.color.surface200,
        },
      }}>
      <Stack.Screen
        name="WorkoutInProgress"
        options={{
          headerShown: true,
          headerBackVisible: true,
          headerShadowVisible: false,
          header: Header,
          headerTransparent: true,
          animation: 'fade_from_bottom',
        }}
        key="WorkoutInProgress"
      />
    </Stack>
  );
};

const store = configureStore({
  reducer: rootReducer,
});

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [loaded] = useFonts({
    'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
    'Kanit-SemiBold': require('../assets/fonts/Kanit-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (loaded) {
      await SplashScreen.hideAsync();
    }
  }, [loaded]);

  return loaded ? (
    <Provider store={store}>
      <MenuProvider>
        <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
          <RootLayout />
        </View>
      </MenuProvider>
    </Provider>
  ) : null;
}
