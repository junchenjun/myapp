import { Button } from '~components/button/Button';

const ButtonStory = {
  title: 'Button',
  component: Button,
  argTypes: {
    type: { options: ['primary', 'icon'], control: { type: 'radio' } },
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

export const Disabled = {
  args: {
    title: 'Disabled Button',
    disabled: true,
  },
};
