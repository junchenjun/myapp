import { Meta, StoryObj } from '@storybook/react-native';

import { Text } from '~components/text/Text';

const TextStory: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  argTypes: {
    size: {
      options: ['body1', 'body2', 'body3', 'body4', 'body5', 'heading1', 'heading2', 'heading3'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'text300', 'text100', 'text200', 'surface300'],
      control: { type: 'select' },
    },
    weight: {
      options: ['medium', 'regular', 'bold'],
      control: { type: 'radio' },
    },
  },
  args: {
    size: 'body1',
    color: 'text100',
    weight: 'regular',
  },
};

export default TextStory;

type IStory = StoryObj<typeof Text>;

export const PrimaryText: IStory = {
  args: {
    text: 'primary',
  },
};
