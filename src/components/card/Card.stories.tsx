import { Meta, StoryObj } from '@storybook/react-native';

import { Card } from '~components/card/Card';
import { Text } from '~components/text/Text';

const CardStory: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  argTypes: {
    onPress: { control: null, action: 'onPress' },
  },
};

type IStory = StoryObj<typeof Text>;

export default CardStory;

export const Default: IStory = {
  render: ({ ...args }) => (
    <Card {...args}>
      <Text>Some stuff</Text>
      <Text>Some stuff</Text>
    </Card>
  ),
};
