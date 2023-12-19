import { Meta, StoryObj } from '@storybook/react-native';

import { Card, ICardProps } from '~components/atoms/card/Card';
import { Text } from '~components/atoms/text/Text';

const CardStory: Meta<ICardProps> = {
  title: 'Card',
  component: Card,
  argTypes: {
    onPress: { control: null, action: 'onPress' },
  },
};

type IStory = StoryObj<ICardProps>;

export default CardStory;

export const Default: IStory = {
  render: ({ ...args }) => (
    <Card {...args}>
      <Text>Some stuff</Text>
      <Text>Some stuff</Text>
    </Card>
  ),
};
