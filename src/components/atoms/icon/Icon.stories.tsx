import { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';

import { icons } from '~assets/icons';
import { Card } from '~components/atoms/card/Card';
import { IIconProps, Icon } from '~components/atoms/icon/Icon';
import { Text } from '~components/atoms/text/Text';

const IconStory: Meta<IIconProps> = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    onPress: { action: 'clicked' },
    colorKey: { options: ['primary', 'onSurface'], control: { type: 'select' } },
  },
};

type IStory = StoryObj<IIconProps>;

export default IconStory;

export const AllIcons: IStory = {
  args: {
    size: 24,
    colorKey: 'primary',
  },
  render: ({ ...args }) => (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      }}
    >
      {Object.keys(icons).map(key => (
        <Card key={key} style={{ marginVertical: 5, width: '31%', padding: 4, paddingVertical: 10 }}>
          <View key={key} style={{ alignItems: 'center', gap: 12 }}>
            <Text variant='pSMRegular' colorKey='onSurfaceDim'>
              {key}
            </Text>
            <Icon {...args} icon={icons[key as keyof typeof icons]} />
          </View>
        </Card>
      ))}
    </View>
  ),
};
