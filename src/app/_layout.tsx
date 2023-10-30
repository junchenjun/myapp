import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useFonts } from 'expo-font';
import * as NavigationBar from 'expo-navigation-bar';
import { Slot, SplashScreen, useRouter } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Platform, useColorScheme } from 'react-native';
import { Provider } from 'react-redux';

import { firebaseAuth, getPlansCollection } from '~firebase/firebaseConfig';
import { setAuth } from '~redux/authSlice';
import { setPlans } from '~redux/planSlice';
import { store, useAppDispatch, useAppSelector } from '~redux/store';
import { DARK_THEME_ID, LIGHT_THEME_ID, setTheme } from '~redux/themeSlice';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [initializing, setInitializing] = useState(true);

  const theme = useAppSelector(state => state.theme);
  const auth = useAppSelector(state => state.auth);
  const router = useRouter();

  const colorScheme = useColorScheme();

  const dispatch = useAppDispatch();

  const [loaded] = useFonts({
    'Kanit-Medium': require('../assets/fonts/Kanit-Medium.ttf'),
    'Kanit-Regular': require('../assets/fonts/Kanit-Regular.ttf'),
    'Kanit-SemiBold': require('../assets/fonts/Kanit-SemiBold.ttf'),
  });

  const isAppReady = loaded && !initializing;

  useEffect(() => {
    if (isAppReady) {
      const hide = async () => {
        await SplashScreen.hideAsync();
      };
      const timer = setTimeout(() => hide(), 1 * 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isAppReady]);

  useEffect(() => {
    if (colorScheme === 'light') {
      dispatch(setTheme(LIGHT_THEME_ID));
    } else {
      dispatch(setTheme(DARK_THEME_ID));
    }
  }, [colorScheme]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(theme.color.surface200);
    }
    if (theme.id === LIGHT_THEME_ID) {
      setStatusBarStyle('dark');
    } else if (theme.id === DARK_THEME_ID) {
      setStatusBarStyle('light');
    }
  }, [theme.id]);

  useEffect(() => {
    if (!auth.authed && isAppReady) {
      router.replace('auth');
    }
  }, [auth.authed, isAppReady]);

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User | null) => {
    if (user) {
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        photoURL: user.photoURL,
        providerId: user.providerId,
        uid: user.uid,
      };
      const plans = (await getPlansCollection(user.uid)).docs.map(doc => doc.data());
      dispatch(setPlans(plans));
      dispatch(setAuth(userInfo));
    } else {
      dispatch(setAuth());
    }
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const subscriber = firebaseAuth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (!loaded) {
    return null;
  }

  return <Slot />;
};

export default function Root() {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}
