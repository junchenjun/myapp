import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { Button } from '~components/atoms/button/Button';
import { ISelectItemProps, SelectItem } from '~components/atoms/selectItem/SelectItem';

type IStory = StoryObj<ISelectItemProps>;

const SelectButtonStory: Meta<ISelectItemProps> = {
  title: 'Atoms/SelectItem',
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
    return args.variant === 'large' ? <SelectItem {...args} icon={icons.Lightning} /> : <SelectItem {...args} />;
  },
};
