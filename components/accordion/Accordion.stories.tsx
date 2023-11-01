import { View } from 'react-native';

import { Accordion } from '~components/accordion/Accordion';
import { AccordionItem } from '~components/accordion/accordionItem/AccordionItem';
import { Text } from '~components/text/Text';

const AccordionStory = {
  title: 'Accordion',
  component: Accordion,
  args: {
    autoCollapse: false,
  },
};

export default AccordionStory;

export const Default = {
  render: ({ ...args }) => (
    <View style={{ flex: 1, width: '100%' }}>
      <Accordion {...args}>
        <AccordionItem id='1' header={<Text>Item 1</Text>}>
          <Text>Item 1</Text>
        </AccordionItem>
        <AccordionItem id='2' header={<Text>Item 2</Text>}>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
          <Text>Item 2</Text>
        </AccordionItem>
        <AccordionItem id='3' header={<Text>Item 3</Text>}>
          <Text>Item 3</Text>
        </AccordionItem>
      </Accordion>
    </View>
  ),
};
