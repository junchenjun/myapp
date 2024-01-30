import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import { setStatusBarStyle } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect, useState } from 'react';
import { Appearance, Platform, useColorScheme } from 'react-native';
import '~i18n/i18n';

import { icons } from '~assets/icons';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import { IActionPageHeader, PageHeader } from '~components/molecules/pageHeader/PageHeader';
import { collections, firebaseAuth, firebaseStore } from '~firebase/firebaseConfig';
import { setAuth } from '~redux/authSlice';
import { IFolder, setFolders } from '~redux/foldersSlice';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { resetWorkoutCreation } from '~redux/workoutCreationSlice';
import { MainTabs } from '~routes/MainTabs';
import { AuthScreen } from '~screens/authScreen/AuthScreen';
import { EditExerciseScreen } from '~screens/editExerciseScreen/EditExerciseScreen';
import { EditWorkoutScreen } from '~screens/editWorkoutScreen/EditWorkoutScreen';
import { FindExerciseScreen } from '~screens/findExerciseScreen/FindExerciseScreen';
import { IAppColorScheme, appColorScheme, useTheme, useUpdateTheme } from '~theme/ThemeContext';
import { getSecureStoreValue, secureStoreKeys } from '~utils/secureStore';

export type RootStackParamList = {
  HomeScreen: undefined;
  EditWorkoutScreen: undefined;
  FindExerciseScreen: undefined;
  EditExerciseScreen: undefined;
};

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [splashHidden, setSplashHidden] = useState(false);

  const theme = useTheme();
  const colorScheme = useColorScheme();
  const auth = useAppSelector(state => state.auth);
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

  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'default',
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.surfaceExtraDim },
      }}
      initialRouteName='MainTabs'
    >
      {!auth.authed ? (
        <Stack.Screen
          name='AuthScreen'
          component={AuthScreen}
          options={{
            headerShown: false,
          }}
        />
      ) : (
        <>
          <Stack.Screen name='MainTabs' component={MainTabs} options={{ headerShown: false }} />
          <Stack.Screen
            name='EditWorkoutScreen'
            component={EditWorkoutScreen}
            options={{
              headerShown: true,
              header: props => {
                return (
                  <PageHeader
                    variant='actionHeader'
                    title='Create Workout'
                    left={{
                      icon: icons.Back,
                      onPress: () => {
                        dispatch(resetWorkoutCreation());
                        props.navigation.goBack();
                      },
                    }}
                    right={{
                      component: (
                        <Pressable
                          onPress={() => {
                            dispatch(resetWorkoutCreation());
                            props.navigation.goBack();
                          }}
                        >
                          <Text variant='h6Regular' text='Save' colorKey='primary' />
                        </Pressable>
                      ),
                    }}
                  />
                );
              },
            }}
          />
          <Stack.Screen
            name='FindExerciseScreen'
            component={FindExerciseScreen}
            options={{
              headerShown: true,
              header: ({ options, navigation }) => {
                const headerSearchBarOptions = options.headerSearchBarOptions as IActionPageHeader['searchBar'];
                return (
                  <PageHeader
                    searchBar={{
                      onChangeText: headerSearchBarOptions?.onChangeText,
                      placeholder: headerSearchBarOptions?.placeholder,
                      value: headerSearchBarOptions?.value,
                      icon: icons.Search,
                      enterKeyHint: 'search',
                    }}
                    variant='actionHeader'
                    title='Find Exercise'
                    left={{
                      icon: icons.Back,
                      onPress: navigation.goBack,
                    }}
                  />
                );
              },
            }}
          />
          <Stack.Screen
            name='EditExerciseScreen'
            component={EditExerciseScreen}
            options={{
              headerShown: true,
              header: ({ navigation }) => {
                return (
                  <PageHeader
                    variant='actionHeader'
                    title='Add Exercise'
                    left={{
                      icon: icons.Back,
                      onPress: navigation.goBack,
                    }}
                  />
                );
              },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
