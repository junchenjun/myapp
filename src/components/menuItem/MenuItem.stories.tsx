import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/menuItem/MenuItem';

const CardStory: Meta<typeof MenuItem> = {
  title: 'MenuItem',
  component: MenuItem,
  argTypes: {
    onPress: { control: null, action: 'onPress' },
    size: { options: ['lg', 'sm'], control: { type: 'select' } },
    color: { options: ['default', 'primaryInverse', 'primary'], control: { type: 'select' } },
  },
};

type IStory = StoryObj<typeof MenuItem>;

export default CardStory;

export const Default: IStory = {
  args: {
    title: 'Appearance',
    desc: 'System Default',
    iconLeft: icons.Lightning,
    roundedBottomCorners: true,
    roundedTopCorners: true,
    withBorder: true,
    danger: false,
    size: 'lg',
    color: 'default',
  },
};
