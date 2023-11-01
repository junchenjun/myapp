import { Pressable } from '~components/pressable/Pressable';

const PressableStory = {
  title: 'Pressable',
  component: Pressable,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    title: 'Hello world',
  },
};

export default PressableStory;

export const Primary = {};
