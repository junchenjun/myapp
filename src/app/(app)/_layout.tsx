import { Stack, router } from 'expo-router';
import { Alert } from 'react-native';

import { icons } from '~assets/icons';
import { PageHeader } from '~components/pageHeader/PageHeader';
import { Pressable } from '~components/pressable/Pressable';
import { Text } from '~components/text/Text';

export default function Layout() {
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

  return (
    <Stack
      screenOptions={{
        animation: 'default',
        headerShown: false,
      }}
    >
      <Stack.Screen
        name='(home)'
        options={{
          headerShown: false,
        }}
        key='home'
      />
      <Stack.Screen
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
                    <Pressable rippleConfig={{ radius: 24, colorKey: 'rippleDim' }}>
                      <Text text='Edit' colorKey='primary' />
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
