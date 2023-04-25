import {
  HeaderStyleInterpolators,
  StackCardInterpolationProps,
  TransitionPresets,
  TransitionSpecs,
} from '@react-navigation/stack';

import { CustomStack } from '../../components/CustomStack';

export default function Layout() {
  return (
    <CustomStack>
      <CustomStack.Screen
        name="(home)"
        options={{
          headerShown: false,
        }}
        key="home"
      />
      <CustomStack.Screen
        name="workoutPreview"
        options={{
          headerShown: false,
          ...TransitionPresets.ModalPresentationIOS,
        }}
        key="workoutPreview"
      />
      <CustomStack.Screen
        name="manageWorkouts"
        options={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        key="manageWorkouts"
      />
    </CustomStack>
  );
}
