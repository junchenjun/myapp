import { useCallback, useEffect, useRef, useState } from 'react';
import {
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

export type IInputProps = {
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  value?: string;
  autoFocus?: boolean;
  editable?: boolean;
  returnKeyType?: ReturnKeyType;
  onChangeValue?: (text: string) => void;
  icon?: IIcon;
  inputMode?: InputModeOptions;
  showMessage?: boolean;
  errorMessage?: string;
  hint?: string;
  onFocus?: () => void;
  onBlur?: () => void;
};

export const Input = (props: IInputProps) => {
  const {
    placeholder,
    keyboardType,
    autoFocus,
    editable = true,
    returnKeyType,
    onChangeValue,
    errorMessage,
    icon,
    value,
    hint,
    showMessage = true,
    inputMode,
    onFocus,
    onBlur,
  } = props;

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
        ref={inputRef}
        onLayout={icon && onLayout}
        style={[
          styles.input,
          !editable && styles.disabled,
          !!errorMessage && styles.error,
          icon && styles.withIcon,
          { color: editable ? theme.colors.onSurface : theme.colors.onSurfaceDim },
        ]}
        onChangeText={onChangeValue}
        value={value}
        placeholder={placeholder}
        keyboardType={keyboardType}
        multiline={false}
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
        maxLength={50}
        inputMode={inputMode}
        autoComplete='off'
        autoCorrect={false}
        autoCapitalize='sentences'
      />
      {showMessage && (
        <View
          style={[styles.message, !!hint && focused && styles.messageVisible, !!errorMessage && styles.messageVisible]}
        >
          <Text variant='pSMRegular' colorKey={errorMessage ? 'error' : 'onSurfaceDim'}>
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
