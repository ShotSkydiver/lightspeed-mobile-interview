import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { colors, borderRadius, typography, spacing } from '../../styles/theme';

export interface InputProps extends TextInputProps {
  placeholder: string;
  value: string;
  hasError?: boolean;
  errorMessage?: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  testID?: string;
}

/**
 * Reusable Input component for forms
 */
export const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  hasError = false,
  errorMessage = '',
  onChangeText,
  secureTextEntry = false,
  autoCapitalize = 'none',
  testID,
  ...rest
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          hasError ? styles.inputError : null,
        ]}
        placeholder={placeholder}
        placeholderTextColor={colors.textTertiary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        testID={testID}
        {...rest}
      />
      {hasError && <Text testID={`${testID}-text-input-error`} style={styles.inputErrorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.text,
  },
  inputError: {
    borderColor: colors.danger,
  },
  inputErrorText: {
    fontSize: typography.fontSize.xs,
    color: colors.danger,
    marginTop: 2,
  },
});
