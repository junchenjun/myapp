import { icons } from '~assets/icons';
import { Button } from '~components/button/Button';
import { SelectButton } from '~components/selectButton/SelectButton';

const SelectButtonStory = {
  title: 'Select Button',
  component: Button,
  argTypes: {
    variant: { options: ['large', 'small'], control: { type: 'radio' } },
  },
  args: {
    title: 'Hello world',
  },
};

export default SelectButtonStory;

export const LargeSelected = {
  args: {
    title: 'Selected Item',
    variant: 'large',
    selected: true,
  },
  render: ({ ...args }) => <SelectButton {...args} icon={icons.Lightning} />,
};

export const LargeUnselected = {
  args: {
    title: 'Unselected Button',
    variant: 'large',
    selected: false,
  },
  render: ({ ...args }) => <SelectButton {...args} icon={icons.Lightning} />,
};
