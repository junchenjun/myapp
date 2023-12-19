import { Meta, StoryObj } from '@storybook/react-native';

import { ILabelProps, Label } from '~components/atoms/label/Label';

const LabelStory: Meta<ILabelProps> = {
  title: 'Label',
  component: Label,
  argTypes: {
    title: { control: 'text' },
  },
};

type IStory = StoryObj<ILabelProps>;

export default LabelStory;

export const Default: IStory = {
  args: {
    title: 'Label A',
  },
};
