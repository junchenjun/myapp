import { useHeaderHeight } from '@react-navigation/elements';
import { ReactNode } from 'react';
import { StatusBar } from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { SafeAreaView } from 'react-native-safe-area-context';

type IKeyboardSafeViewProps = {
  children?: ReactNode | ReactNode[];
};

export const KeyboardSafeView = (props: IKeyboardSafeViewProps) => {
  const { children } = props;
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView edges={['bottom']} style={{ flex: 1 }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight - (StatusBar.currentHeight || 0)}
        style={{ flex: 1 }}
        behavior='height'
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
