import { useCallback, useEffect, useRef, useState } from 'react';
import {
  EnterKeyHintTypeOptions,
  InputModeOptions,
  Keyboard,
  KeyboardTypeOptions,
  LayoutChangeEvent,
  Platform,
  ReturnKeyType,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

import { IIcon } from '~assets/icons';
import { Icon } from '~components/atoms/icon/Icon';
import { Text } from '~components/atoms/text/Text';
import { ITheme, appColorScheme, useTheme, useThemedStyles } from '~theme/ThemeContext';

type ICommonInputProps = {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  autoFocus?: boolean;
  editable?: boolean;
  returnKeyType?: ReturnKeyType;
  onChangeValue?: (text: string) => void;
  inputMode?: InputModeOptions;
  onFocus?: () => void;
  onBlur?: () => void;
  enterKeyHint?: EnterKeyHintTypeOptions;
};

interface IOpenInputProps extends ICommonInputProps {
  variant: 'open';
}

interface IEnclosedInputProps extends ICommonInputProps {
  variant: 'enclosed';
  icon?: IIcon;
  showMessage?: boolean;
  errorMessage?: string;
  hint?: string;
}

interface ITextAreaInputProps extends ICommonInputProps {
  variant: 'textArea';
}

export type IInputProps = IOpenInputProps | IEnclosedInputProps | ITextAreaInputProps;

export const Input = (props: IInputProps) => {
  const {
    placeholder,
    keyboardType = 'default',
    autoFocus,
    editable = true,
    returnKeyType,
    onChangeValue,
    value,
    inputMode = 'text',
    onFocus,
    onBlur,
    enterKeyHint = 'done',
    variant,
  } = props;

  const multiline = variant === 'textArea';
  const errorMessage = variant === 'enclosed' ? props.errorMessage : '';
  const icon = variant === 'enclosed' ? props.icon : undefined;
  const hint = variant === 'enclosed' ? props.hint : '';
  const showMessage = variant === 'enclosed' && props.showMessage;

  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(0);

  const inputRef = useRef<TextInput>(null);

  const styles = useThemedStyles(themedStyles);
  const theme = useTheme();

  useEffect(() => {
    if (Platform.OS === 'android') {
      const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
        inputRef.current?.blur();
      });
      return () => {
        hideSubscription.remove();
      };
    }
  }, []);

  const onLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const onLayoutHeight = event.nativeEvent.layout.height;
      if (onLayoutHeight > 0 && height !== onLayoutHeight) {
        setHeight(Math.round(onLayoutHeight));
      }
    },
    [height]
  );

  const handleOnFocus = useCallback(() => {
    setFocused(true);
    onFocus && onFocus();
  }, [onFocus]);
  const handleOnBlur = useCallback(() => {
    setFocused(false);
    onBlur && onBlur();
  }, [onBlur]);

  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          icon={icon}
          style={[styles.icon, { top: height / 2 - 12 }]}
          colorKey={editable ? 'onSurfaceDim' : 'onSurfaceExtraDim'}
        />
      )}
      <TextInput
        multiline={multiline}
        maxLength={multiline ? 320 : 48}
        ref={inputRef}
        onLayout={icon && onLayout}
        style={[
          styles.input,
          multiline && styles.large,
          !editable && styles.disabled,
          !!errorMessage && styles.error,
          icon && styles.withIcon,
          { color: editable ? theme.colors.onSurface : theme.colors.onSurfaceDim },
          variant === 'open' && styles.open,
        ]}
        onChangeText={onChangeValue}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoFocus={!!autoFocus}
        clearButtonMode='while-editing'
        cursorColor={theme.colors.primary}
        editable={!!editable}
        returnKeyType={returnKeyType}
        enablesReturnKeyAutomatically
        placeholderTextColor={theme.colors.onSurfaceExtraDim}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        keyboardAppearance={theme.id === appColorScheme.dark ? 'dark' : 'light'}
        underlineColorAndroid='transparent'
        inputMode={inputMode}
        autoComplete='off'
        autoCorrect={false}
        autoCapitalize='sentences'
        enterKeyHint={enterKeyHint}
        importantForAutofill='no'
        selectTextOnFocus={false}
        textAlign='left'
      />
      {showMessage && (
        <View
          style={[styles.message, !!hint && focused && styles.messageVisible, !!errorMessage && styles.messageVisible]}
        >
          <Text variant='pSMItalic' colorKey={errorMessage ? 'error' : 'onSurfaceDim'}>
            {errorMessage ? errorMessage : hint ? hint : 'placeholder'}
          </Text>
        </View>
      )}
    </View>
  );
};

const themedStyles = (theme: ITheme) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      position: 'relative',
    },
    icon: {
      position: 'absolute',
      zIndex: 1,
      left: theme.spacing[3],
    },
    withIcon: {
      paddingLeft: theme.spacing[10],
    },
    input: {
      borderWidth: 1,
      padding: theme.spacing[2],
      paddingHorizontal: theme.spacing[3],
      borderRadius: theme.radius.sm,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surfaceExtraBright,
      ...theme.fonts.pLGRegular,
    },
    open: {
      borderWidth: 0,
      borderBottomWidth: 1,
      paddingHorizontal: theme.spacing[1],
      paddingBottom: theme.spacing[1],
      color: theme.colors.primary,
      ...theme.fonts.h4Regular,
      height: 50,
    },
    large: {
      textAlignVertical: 'top',
      height: 160,
      ...theme.fonts.pMDRegular,
    },
    disabled: {
      backgroundColor: theme.colors.surfaceDim,
    },
    error: {
      borderColor: theme.colors.error,
    },
    message: {
      paddingHorizontal: theme.spacing[1],
      opacity: 0,
    },
    messageVisible: {
      opacity: 1,
    },
  });
};
