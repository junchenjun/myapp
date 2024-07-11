import i18next from 'i18next';

import { IMuscleTarget, IWorkout } from '~redux/workoutSlice';

export const getWorkoutTargetMuscles = (item?: IWorkout) => {
  return item
    ? item.exercises
        .reduce((val: IMuscleTarget[], next) => [...new Set([...val, ...next.targets])], [])
        .map(v => i18next.t(v))
    : [];
};
