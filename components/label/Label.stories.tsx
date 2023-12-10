import { Meta, StoryObj } from '@storybook/react-native';

import { Label } from '~components/label/Label';

const LabelStory: Meta<typeof Label> = {
  title: 'Label',
  component: Label,
  argTypes: {
    title: { control: 'text' },
  },
};

type IStory = StoryObj<typeof Label>;

export default LabelStory;

export const Default: IStory = {
  args: {
    title: 'Label A',
  },
};
