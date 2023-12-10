import { EdgeInsets } from 'react-native-safe-area-context';

export const getFloatButtonDistance = (insets: EdgeInsets) => {
  return insets.bottom + 20;
};
