import { Meta, StoryObj } from '@storybook/react-native';

import { ITextProps, Text } from '~components/atoms/text/Text';

const TextStory: Meta<ITextProps> = {
  title: 'Atoms/Text',
  component: Text,
  argTypes: {
    variant: {
      options: ['h1Regular', 'h1Light', 'h1Medium', 'h2Light', 'h2Regular', 'h2Medium', 'h3Light', 'h3Regular'],
      control: { type: 'select' },
    },
    colorKey: {
      options: ['primary', 'onSurface', 'onPrimary', 'onSurfaceDim', 'onSurfaceExtraDim', 'error', 'onError'],
      control: { type: 'select' },
    },
  },
  args: {
    variant: 'h1Regular',
    colorKey: 'primary',
  },
};

export default TextStory;

type IStory = StoryObj<ITextProps>;

export const Default: IStory = {
  args: {
    text: 'primary',
  },
};
