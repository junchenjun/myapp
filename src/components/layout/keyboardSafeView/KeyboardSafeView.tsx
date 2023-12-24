import { useHeaderHeight } from '@react-navigation/elements';
import { ReactNode } from 'react';
import { KeyboardAvoidingView } from 'react-native';

type IKeyboardSafeViewProps = {
  children?: ReactNode | ReactNode[];
};

export const KeyboardSafeView = (props: IKeyboardSafeViewProps) => {
  const { children } = props;
  const headerHeight = useHeaderHeight();

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={{ flex: 1 }} behavior='height'>
      {children}
    </KeyboardAvoidingView>
  );
};
