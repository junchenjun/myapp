import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { Text } from '~components/atoms/text/Text';
import { Accordion } from '~components/molecules/accordion/Accordion';
import { IWorkoutItemProps, WorkoutItem } from '~components/organisms/workoutItem/WorkoutItem';

const WorkoutItemStory: Meta<IWorkoutItemProps> = {
  title: 'Organisms/WorkoutItem',
  component: WorkoutItem,
  argTypes: {
    title: { control: 'text' },
  },
};

type IStory = StoryObj<IWorkoutItemProps>;

export default WorkoutItemStory;

export const Default: IStory = {
  args: {
    title: 'Chest&Triceps',
    descItems: ['8 Exercises', '5 days ago'],
    header: {
      labels: ['Shoulder', 'biceps'],
    },
  },
};

export const WithAccordion = {
  args: {
    autoCollapse: true,
    styled: true,
  },
  render: ({ ...args }) => (
    <Accordion {...args}>
      <Accordion.Item>
        <Accordion.Trigger>
          {({ open, toggle }) => (
            <WorkoutItem
              title='Chest&Triceps'
              header={{
                labels: ['Shoulder', 'biceps'],
              }}
              descItems={['8 Exercises', '5 days ago']}
              onActionIconPress={toggle}
              actionIcon={open ? icons.ExpandUp : icons.ExpandDown}
            />
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>
          {({ open, toggle }) => (
            <WorkoutItem
              title='Chest&Triceps'
              header={{
                labels: ['Shoulder', 'biceps'],
              }}
              descItems={['8 Exercises', '5 days ago']}
              onActionIconPress={toggle}
              actionIcon={open ? icons.ExpandUp : icons.ExpandDown}
            />
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
          <Text>content content content content content content content</Text>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
