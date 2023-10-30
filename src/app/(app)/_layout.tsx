import { ParamListBase, StackNavigationState } from '@react-navigation/native';
import {
  StackNavigationEventMap,
  StackNavigationOptions,
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { Stack, useRouter, withLayoutContext } from 'expo-router';

import { PageHeader } from '~components/PageHeader';
import { ThemedButton } from '~components/ThemedButton';
import { ThemedText } from '~components/ThemedText';

const { Navigator } = createStackNavigator();

export const JsStack = withLayoutContext<
  StackNavigationOptions,
  typeof Navigator,
  StackNavigationState<ParamListBase>,
  StackNavigationEventMap
>(Navigator);

export default function Layout() {
  const xx = true;

  const router = useRouter();

  return xx ? (
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
          headerTransparent: true,
          header: () => {
            return (
              <PageHeader
                rightComponent={<ThemedButton title='Edit' type='text' onPress={() => null} />}
                leftIcon='goBack'
                onPress={() => router.back()}
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
                rightComponent={
                  <ThemedText color='primary' size='body2'>
                    00:13:22
                  </ThemedText>
                }
                title={title}
                leftIcon='goBack'
                titleAlign='left'
              />
            );
          },
          headerTransparent: true,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
        key='workout'
      />
      <JsStack.Screen
        name='auth'
        options={{
          headerShown: false,
          headerTransparent: true,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
        key='auth'
      />
    </JsStack>
  ) : (
    <Stack>
      <Stack.Screen
        name='(home)'
        options={{
          headerShown: false,
          animation: 'fade',
        }}
        key='home'
      />
      <Stack.Screen
        name='preview'
        options={{
          headerShown: false,
          // presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
        key='preview'
      />
      <Stack.Screen
        name='workout'
        options={{
          headerShown: true,
          header: ({ route }) => {
            const title = (route?.params as { title: string }).title;
            return <PageHeader title={title} leftIcon='close' />;
          },
          animation: 'fade',
          headerTransparent: true,
        }}
        key='workout'
      />
      <Stack.Screen
        name='auth'
        options={{
          headerShown: false,
          headerTransparent: true,
          animation: 'fade',
        }}
        key='auth'
      />
    </Stack>
  );
}
