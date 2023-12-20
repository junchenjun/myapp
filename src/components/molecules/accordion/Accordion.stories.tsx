import { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { icons } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Text } from '~components/atoms/text/Text';
import { Accordion, IAccordionProps } from '~components/molecules/accordion/Accordion';

type IStory = StoryObj<IAccordionProps>;

const AccordionStory: Meta<IAccordionProps> = {
  title: 'Molecules/Accordion',
  component: Accordion,
  args: {
    autoCollapse: true,
    styled: true,
  },
};

export default AccordionStory;

export const Default: IStory = {
  render: ({ ...args }) => (
    <Accordion {...args}>
      <Accordion.Item style={{ backgroundColor: 'skyblue' }}>
        <Accordion.Trigger>
          {({ open, toggle }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Click the icon 1</Text>
              <Icon icon={open ? icons.ExpandUp : icons.ExpandDown} onPress={toggle} />
            </View>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <Text>Content</Text>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>
          {({ open, toggle }) => (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>Click the icon 2</Text>
              <Icon icon={open ? icons.ExpandUp : icons.ExpandDown} onPress={toggle} />
            </View>
          )}
        </Accordion.Trigger>
        <Accordion.Content>
          <Text>Content</Text>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item>
        <Accordion.Trigger>
          <Text>Click the card</Text>
        </Accordion.Trigger>
        <Accordion.Content>
          <Text>Content</Text>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>
  ),
};
