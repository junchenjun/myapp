import { Meta, StoryObj } from '@storybook/react-native';

import { Accordion } from '~components/accordion/Accordion';
import { Text } from '~components/text/Text';
import { WorkoutContainer } from '~components/workoutContainer/WorkoutContainer';

const WorkoutContainerStory: Meta<typeof WorkoutContainer> = {
  title: 'WorkoutContainer',
  component: WorkoutContainer,
  argTypes: {
    title: { control: 'text' },
  },
};

type IStory = StoryObj<typeof WorkoutContainer>;

export default WorkoutContainerStory;

export const Default: IStory = {
  args: {
    title: 'Chest&Triceps',
    descItems: ['8 Exercises', '5 days ago'],
    header: {
      labels: ['Shoulder', 'biceps'],
      onPress: () => null,
    },
  },
};

export const Complex = {
  render: () => (
    <Accordion>
      <WorkoutContainer
        title='Chest&Triceps'
        header={{
          labels: ['Shoulder', 'biceps'],
          onPress: () => null,
        }}
        descItems={['8 Exercises', '5 days ago']}
        accordionItem={
          <>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
            <Text>content content content content content content content</Text>
          </>
        }
      />
    </Accordion>
  ),
};
