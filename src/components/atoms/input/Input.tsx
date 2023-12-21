import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useCallback, useEffect, useState } from 'react';
import {
  InputModeOptions,
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
  onChangeValue?: ((text: string) => void) | undefined;
  icon?: IIcon;
  inputMode?: InputModeOptions;
  showMessage?: boolean;
  errorMessage?: string;
  hint?: string;
  handleKeyboardInModal?: boolean;
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
    showMessage,
    inputMode,
    handleKeyboardInModal,
  } = props;

  const [focused, setFocused] = useState(false);
  const [height, setHeight] = useState(0);

  const styles = useThemedStyles(themedStyles);
  const theme = useTheme();
  const { shouldHandleKeyboardEvents } = useBottomSheetInternal();

  useEffect(() => {
    return () => {
      shouldHandleKeyboardEvents.value = false;
    };
  }, [shouldHandleKeyboardEvents]);

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
    handleKeyboardInModal && Platform.OS === 'ios' && (shouldHandleKeyboardEvents.value = true);
    setFocused(true);
  }, [handleKeyboardInModal, shouldHandleKeyboardEvents]);
  const handleOnBlur = useCallback(() => {
    handleKeyboardInModal && Platform.OS === 'ios' && (shouldHandleKeyboardEvents.value = false);
    setFocused(false);
  }, [handleKeyboardInModal, shouldHandleKeyboardEvents]);

  return (
    <View style={styles.container}>
      {icon && (
        <Icon
          icon={icon}
          style={[styles.icon, { top: height / 2 - 12 }]}
          colorKey={editable ? (focused && !errorMessage ? 'primary' : 'onSurfaceDim') : 'onSurfaceExtraDim'}
        />
      )}
      <TextInput
        onLayout={icon && onLayout}
        style={[
          styles.input,
          focused && styles.focused,
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
          <Text variant='pXSRegular' colorKey={errorMessage ? 'error' : 'primary'}>
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
      padding: theme.spacing[3],
      borderRadius: theme.radius.sm,
      borderColor: theme.colors.outline,
      backgroundColor: theme.colors.surfaceExtraBright,
      ...theme.fonts.pMDRegular,
    },
    focused: {
      borderColor: theme.colors.primary,
    },
    disabled: {
      backgroundColor: theme.colors.surfaceDim,
    },
    error: {
      borderColor: theme.colors.error,
    },
    message: {
      paddingHorizontal: theme.spacing[2],
      opacity: 0,
    },
    messageVisible: {
      opacity: 1,
    },
  });
};
