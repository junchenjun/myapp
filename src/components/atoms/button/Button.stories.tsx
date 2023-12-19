import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { Button, IButtonProps } from '~components/atoms/button/Button';

type IStory = StoryObj<IButtonProps>;

const ButtonStory: Meta<IButtonProps> = {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: { options: ['primary', 'ghost'], control: { type: 'radio' } },
  },
  args: {
    title: 'Hello World',
    loading: false,
    disabled: false,
    variant: 'primary',
  },
};
export default ButtonStory;

export const Default: IStory = {
  render: ({ ...args }) => <Button {...args} icon={icons.Lightning} />,
};
