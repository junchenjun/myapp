import { Accordion } from '~components/accordion/Accordion';
import { AccordionItem } from '~components/accordion/accordionItem/AccordionItem';
import { Text } from '~components/text/Text';

const AccordionStory = {
  title: 'Accordion',
  component: Accordion,
  args: {
    autoCollapse: true,
  },
};

export default AccordionStory;

export const Default = {
  render: ({ ...args }) => (
    <Accordion {...args}>
      <AccordionItem title='1'>
        <Text>Item 1</Text>
      </AccordionItem>
      <AccordionItem title='2'>
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
      <AccordionItem title='3'>
        <Text>Item 3</Text>
      </AccordionItem>
    </Accordion>
  ),
};
