import { Meta, StoryObj } from '@storybook/react-native';

import { Text } from '~components/atoms/text/Text';
import { Accordion, IAccordionProps } from '~components/molecules/accordion/Accordion';
import { AccordionItem } from '~components/molecules/accordion/accordionItem/AccordionItem';

type IStory = StoryObj<IAccordionProps>;

const AccordionStory: Meta<IAccordionProps> = {
  title: 'Accordion',
  component: Accordion,
  args: {
    autoCollapse: true,
  },
};

export default AccordionStory;

export const Default: IStory = {
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
