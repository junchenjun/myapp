import { IMuscleTarget, IWorkout } from '~redux/workoutSlice';

export const getWorkoutTargetMuscles = (item?: IWorkout) => {
  return item ? item.exercises.reduce((val: IMuscleTarget[], next) => [...new Set([...val, ...next.targets])], []) : [];
};
