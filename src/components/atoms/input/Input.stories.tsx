import { Meta, StoryObj } from '@storybook/react-native';

import { icons } from '~assets/icons';
import { IInputProps, Input } from '~components/atoms/input/Input';

const LabelStory: Meta<IInputProps> = {
  title: 'Atoms/Input',
  component: Input,
};

type IStory = StoryObj<IInputProps>;

export default LabelStory;

export const Default: IStory = {
  args: {
    placeholder: 'Placeholder',
    editable: true,
    errorMessage: '',
    icon: icons.Search,
    hint: 'An Error Occurred',
    withMessage: true,
  },
};
