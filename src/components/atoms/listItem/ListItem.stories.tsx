import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { IListItemProps, ListItem } from '~components/atoms/listItem/ListItem';

const CardStory: Meta<IListItemProps> = {
  title: 'Atoms/ListItem',
  component: ListItem,
  argTypes: {
    onPress: { control: null, action: 'onPress' },
    size: { options: ['lg', 'sm'], control: { type: 'select' } },
    color: { options: ['default', 'primaryInverse', 'primary'], control: { type: 'select' } },
  },
};

type IStory = StoryObj<IListItemProps>;

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
