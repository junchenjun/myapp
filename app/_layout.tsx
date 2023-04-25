import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { configureStore } from '@reduxjs/toolkit';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { User } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { auth } from '../firebaseConfig';
import { setUserInfo } from '../redux/authSlice';
import { rootReducer } from '../redux/reducer';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '244734442198-d4mo1hj0a21q2887672csn2s23j5evd9.apps.googleusercontent.com',
  scopes: ['profile', 'email'],
});

export type RootState = ReturnType<typeof store.getState>;

const AuthLiscenter = ({ children }) => {
  const [initializing, setInitializing] = useState(true);

  const user = useSelector((state: RootState) => state.auth);
  const theme = useSelector((state: RootState) => state.theme);

  const segments = useSegments();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.styles.color.surface300);
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

  return children;
};

const store = configureStore({
  reducer: rootReducer,
});

SplashScreen.preventAutoHideAsync();

export default function Root() {
  const [fontsLoaded] = useFonts({
    'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
    'Kanit-SemiBold': require('../assets/fonts/Kanit-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  return (
    <Provider store={store}>
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <AuthLiscenter>
          <Slot />
        </AuthLiscenter>
      </View>
    </Provider>
  );
}
