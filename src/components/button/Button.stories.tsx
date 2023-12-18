import { icons } from '~assets/icons';
import { Button } from '~components/button/Button';

const ButtonStory = {
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

export const Default = {
  render: ({ ...args }) => <Button {...args} icon={icons.Lightning} />,
};
