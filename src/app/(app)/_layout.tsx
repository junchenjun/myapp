import { Stack, router } from 'expo-router';
import { Alert } from 'react-native';

import { icons } from '~assets/icons';
import { Pressable } from '~components/atoms/pressable/Pressable';
import { Text } from '~components/atoms/text/Text';
import { IActionPageHeader, PageHeader } from '~components/molecules/pageHeader/PageHeader';
import { useAppDispatch } from '~redux/store';
import { resetWorkoutCreation } from '~redux/workoutCreationSlice';

export default function Layout() {
  const dispatch = useAppDispatch();

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
                    <Pressable>
                      <Text variant='h6Regular' text='Edit' colorKey='primary' />
                    </Pressable>
                  ),
                }}
                left={{
                  icon: icons.Back,
                  onPress: router.back,
                }}
              />
            );
          },
        }}
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
      />
      <Stack.Screen
        name='editWorkout'
        options={{
          headerShown: true,
          header: () => {
            return (
              <PageHeader
                variant='actionHeader'
                title='Create Workout'
                left={{
                  icon: icons.Back,
                  onPress: () => {
                    dispatch(resetWorkoutCreation());
                    router.back();
                  },
                }}
                right={{
                  component: (
                    <Pressable
                      onPress={() => {
                        dispatch(resetWorkoutCreation());
                        router.back();
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
        name='findExercise'
        options={{
          headerShown: true,
          header: ({ options }) => {
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
                  onPress: router.back,
                }}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name='editExercise'
        options={{
          headerShown: true,
          header: () => {
            return (
              <PageHeader
                variant='actionHeader'
                title='Add Exercise'
                left={{
                  icon: icons.Back,
                  onPress: router.back,
                }}
              />
            );
          },
        }}
      />
      <Stack.Screen
        name='auth'
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
