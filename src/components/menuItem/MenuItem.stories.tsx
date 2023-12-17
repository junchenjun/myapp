import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { MenuItem } from '~components/menuItem/MenuItem';

const CardStory: Meta<typeof MenuItem> = {
  title: 'Menu Item',
  component: MenuItem,
  argTypes: {
    onPress: { control: null, action: 'onPress' },
  },
};

type IStory = StoryObj<typeof MenuItem>;

export default CardStory;

export const Basic: IStory = {
  args: {
    title: 'Appearance',
    desc: 'System Default',
    iconLeft: icons.Lightning,
    roundedBottomCorners: true,
    roundedTopCorners: true,
    withBorder: true,
    danger: false,
  },
};
