import { Meta, StoryObj } from '@storybook/react-native';

import { Accordion } from '~components/accordion/Accordion';
import { Text } from '~components/text/Text';
import { IWorkoutContainerProps, WorkoutContainer } from '~components/workoutContainer/WorkoutContainer';

const WorkoutContainerStory: Meta<IWorkoutContainerProps> = {
  title: 'WorkoutContainer',
  component: WorkoutContainer,
  argTypes: {
    title: { control: 'text' },
  },
};

type IStory = StoryObj<IWorkoutContainerProps>;

export default WorkoutContainerStory;

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
  render: () => (
    <Accordion>
      <WorkoutContainer
        title='Chest&Triceps'
        header={{
          labels: ['Shoulder', 'biceps'],
        }}
        descItems={['8 Exercises', '5 days ago']}
        accordionContent={
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
      <WorkoutContainer
        title='Back&Biceps'
        header={{
          labels: ['Shoulder', 'biceps'],
        }}
        descItems={['8 Exercises', '5 days ago']}
        accordionContent={
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
