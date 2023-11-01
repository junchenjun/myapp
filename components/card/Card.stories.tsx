import { Card } from '~components/card/Card';
import { Text } from '~components/text/Text';

const CardStory = {
  title: 'Card',
  component: Card,
  args: {
    onPress: () => null,
  },
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  render: ({ ...args }) => (
    <Card {...args}>
      <Text>Some stuff</Text>
      <Text>Some stuff</Text>
    </Card>
  ),
};

export default CardStory;

export const Default = {};
