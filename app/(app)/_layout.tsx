import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="(home)"
        options={{
          headerShown: false,
        }}
        key="home"
      />
      <Stack.Screen
        name="workoutPreview"
        options={{
          headerShown: false,
          presentation: 'modal',
          animation: 'fade_from_bottom',
        }}
        key="workoutPreview"
      />
      <Stack.Screen
        name="manageWorkouts"
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        key="manageWorkouts"
      />
    </Stack>
  );
}
