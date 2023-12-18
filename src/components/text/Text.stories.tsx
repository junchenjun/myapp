import { Meta, StoryObj } from '@storybook/react-native';

import { Text } from '~components/text/Text';

const TextStory: Meta<typeof Text> = {
  title: 'Text',
  component: Text,
  argTypes: {
    variant: {
      options: ['h1Regular', 'h1Light', 'h1Medium', 'h2Light', 'h2Regular', 'h2Medium', 'h3Light', 'h3Regular'],
      control: { type: 'select' },
    },
    color: {
      options: ['primary', 'onSurface', 'onPrimary', 'onSurfaceDim', 'onSurfaceExtraDim', 'error', 'onError'],
      control: { type: 'select' },
    },
  },
  args: {
    variant: 'h1Regular',
    color: 'primary',
  },
};

export default TextStory;

type IStory = StoryObj<typeof Text>;

export const Default: IStory = {
  args: {
    text: 'primary',
  },
};
