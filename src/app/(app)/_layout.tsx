import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Stack, router, withLayoutContext } from 'expo-router';
import { Alert } from 'react-native';

import { icons } from '~assets/icons';
import { PageHeader } from '~components/pageHeader/PageHeader';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';

const { Navigator } = createStackNavigator();

export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);

export default function Layout() {
  const useNativeRouter = true;

  const createAlert = () =>
    Alert.alert(
      'Leave workout?',
      'You will be able to resume later',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => router.back() },
      ],
      {
        cancelable: true,
      }
    );

  return !useNativeRouter ? (
    <JsStack>
      <JsStack.Screen
        name='(home)'
        options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        key='home'
      />
      <JsStack.Screen
        name='preview'
        options={{
          headerShown: true,
          header: props => {
            const title = (props.route?.params as { title: string }).title;
            const showTitle = (props.options as { showTitle?: boolean }).showTitle;

            return (
              <PageHeader
                variant='actionHeader'
                title={title}
                showTitle={showTitle || false}
                right={{
                  component: (
                    <Pressable rippleConfig={{ radius: 24, color: 'rippleDim' }}>
                      <Text text='Edit' color='primary' />
                    </Pressable>
                  ),
                }}
                left={{
                  icon: icons.Back,
                  onPress: () => router.back(),
                }}
              />
            );
          },
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        key='preview'
      />
      <JsStack.Screen
        name='workout'
        options={{
          headerShown: true,
          header: ({ route }) => {
            const title = (route?.params as { title: string }).title;
            return (
              <PageHeader
                variant='actionHeader'
                title={title}
                left={{
                  icon: icons.Back,
                  onPress: createAlert,
                }}
              />
            );
          },
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        key='workout'
      />
      <JsStack.Screen
        name='auth'
        options={{
          headerShown: false,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
        key='auth'
      />
    </JsStack>
  ) : (
    // native
    <Stack>
      <Stack.Screen
        name='(home)'
        options={{
          headerShown: false,
          // animation: 'fade',
        }}
        key='home'
      />
      <Stack.Screen
        name='preview'
        options={{
          headerShown: true,
          animation: 'default',
          header: () => {
            return (
              <PageHeader
                variant='actionHeader'
                right={{
                  component: (
                    <Pressable rippleConfig={{ radius: 24, color: 'rippleDim' }}>
                      <Text text='Edit' color='primary' />
                    </Pressable>
                  ),
                }}
                left={{
                  icon: icons.Back,
                  onPress: () => router.back(),
                }}
              />
            );
          },
        }}
        key='preview'
      />
      <Stack.Screen
        name='workout'
        options={{
          headerShown: true,
          header: ({ route }) => {
            const title = (route?.params as { title: string }).title;
            return (
              <PageHeader
                variant='actionHeader'
                title={title}
                left={{
                  icon: icons.Back,
                  onPress: createAlert,
                }}
              />
            );
          },
        }}
        key='workout'
      />
      <Stack.Screen
        name='auth'
        options={{
          headerShown: false,
        }}
        key='auth'
      />
    </Stack>
  );
}
