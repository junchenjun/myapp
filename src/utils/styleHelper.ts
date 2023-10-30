import { EdgeInsets } from 'react-native-safe-area-context';

export const getPagePaddingTopWithHeader = (insets: EdgeInsets) => {
  return (insets.top < 44 ? 44 : insets.top) + 58;
};

export const getFloatButtonDistance = (insets: EdgeInsets) => {
  return insets.bottom + 25;
};
