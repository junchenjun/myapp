import { Meta, StoryObj } from '@storybook/react-native';

import { WeeklyActivity } from '~components/weeklyActivity/WeeklyActivity';

const WeeklyActivityStory: Meta<typeof WeeklyActivity> = {
  title: 'WeeklyActivity',
  component: WeeklyActivity,
};

type IStory = StoryObj<typeof WeeklyActivity>;

export default WeeklyActivityStory;

export const Default: IStory = {
  args: {
    config: {
      mo: { value: 'Mo', variant: 'completed' },
      tu: { value: 'Tu', variant: 'completed' },
      we: { value: 'We', variant: 'completed' },
      th: { value: 'Tu', variant: 'active' },
      fr: { value: 'Fr', variant: 'inactive' },
      sa: { value: 'Sa', variant: 'inactive' },
      su: { value: 'Su', variant: 'inactive' },
    },
  },
};
