import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/button/Button';
import { ISelectButtonProps, SelectButton } from '~components/selectButton/SelectButton';

type IStory = StoryObj<ISelectButtonProps>;

const SelectButtonStory: Meta<ISelectButtonProps> = {
  title: 'SelectButton',
  component: Button,
  argTypes: {
    variant: { options: ['large', 'small'], control: { type: 'radio' } },
  },
  args: {
    title: 'Hello world',
  },
};

export default SelectButtonStory;

export const Default: IStory = {
  args: {
    title: 'Selected Item',
    variant: 'large',
    selected: true,
  },
  render: ({ ...args }) => {
    return args.variant === 'large' ? <SelectButton {...args} icon={icons.Lightning} /> : <SelectButton {...args} />;
  },
};
