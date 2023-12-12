import { icons } from '~assets/icons';
import { Button } from '~components/button/Button';
import { Icon } from '~components/icon/Icon';

const ButtonStory = {
  title: 'Button',
  component: Button,
  argTypes: {
    variant: { options: ['primary', 'icon'], control: { type: 'radio' } },
  },
  args: {
    title: 'Hello world',
    loading: false,
    disabled: false,
    type: 'primary',
  },
};

export default ButtonStory;

export const Primary = {
  args: {
    title: 'Primary Button',
    type: 'primary',
  },
};

export const PrimaryWithIcon = {
  args: {
    title: 'Primary Button',
    type: 'primary',
  },
  render: ({ ...args }) => <Button {...args} icon={<Icon icon={icons.Zap} color='onPrimary' />} />,
};

export const Disabled = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};
