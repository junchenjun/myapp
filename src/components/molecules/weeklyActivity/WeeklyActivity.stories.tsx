import { Meta, StoryObj } from '@storybook/react-native';

import { IWeeklyActivityProps, WeeklyActivity } from '~components/molecules/weeklyActivity/WeeklyActivity';

const WeeklyActivityStory: Meta<IWeeklyActivityProps> = {
  title: 'WeeklyActivity',
  component: WeeklyActivity,
};

type IStory = StoryObj<IWeeklyActivityProps>;

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
