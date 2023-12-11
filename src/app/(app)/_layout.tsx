import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Stack, useRouter, withLayoutContext } from 'expo-router';
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
  const useNativeRouter = false;

  const router = useRouter();

  const createAlert = () =>
    Alert.alert(
      'Leave workout?',
      'You will be able to resume later',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        { text: 'Confirm', onPress: () => router.replace('(home)') },
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
          ...TransitionPresets.FadeFromBottomAndroid,
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
                    <Pressable rippleConfig={{ radius: 24 }}>
                      <Text text='Edit' color='primary' />
                    </Pressable>
                  ),
                }}
                left={{
                  icon: icons.back,
                  onPress: () => router.back(),
                }}
              />
            );
          },
          ...TransitionPresets.FadeFromBottomAndroid,
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
                  icon: icons.back,
                  onPress: createAlert,
                }}
              />
            );
          },
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
        key='workout'
      />
      <JsStack.Screen
        name='auth'
        options={{
          headerShown: false,
          ...TransitionPresets.FadeFromBottomAndroid,
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
          // presentation: 'modal',
          animation: 'default',
          header: () => {
            return (
              <PageHeader
                variant='actionHeader'
                right={{
                  component: (
                    <Pressable rippleConfig={{ radius: 24 }}>
                      <Text text='Edit' color='primary' />
                    </Pressable>
                  ),
                }}
                left={{
                  icon: icons.back,
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
                  icon: icons.back,
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
