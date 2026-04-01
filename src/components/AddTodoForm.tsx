import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors, borderRadius, spacing, typography } from '../styles/theme';

export interface AddTodoFormProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  disabled?: boolean;
  testID?: string;
}

/**
 * AddTodoForm component for adding new todos
 */
export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  value,
  onChangeText,
  onSubmit,
  placeholder = 'Add a new todo...',
  disabled = false,
  testID,
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            hasError ? styles.inputError : null,
          ]}
          placeholder={placeholder}
          editable={!disabled}
          placeholderTextColor={colors.textTertiary}
          value={value}
          onChangeText={text => {
            onChangeText(text);

            if (text) {
              setHasError(false);
            }
          }}
          onSubmitEditing={() => {
            if (!value) {
              setHasError(true);
              return;
            }

            onSubmit();
          }}
          testID={`${testID}-text-input`}
        />
        {hasError && <Text testID={`${testID}-text-input-error`} style={styles.inputErrorText}>A todo must have text</Text>}
      </View>
      <TouchableOpacity
        testID={`${testID}-add-button`}
        disabled={disabled}
        style={styles.addButton}
        onPress={() => {
          if (!value) {
            setHasError(true);
            return;
          }

          onSubmit();
        }}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    minHeight: 48,
  },
  inputContainer: {
    flexDirection: 'column',
    flexGrow: 1,
  },
  input: {
    flex: 1,
    flexGrow: 1,
    alignSelf: 'stretch',
    minHeight: 48,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSize.md,
    color: colors.text,
    marginRight: spacing.sm,
  },
  inputError: {
    borderColor: colors.danger,
  },
  inputErrorText: {
    fontSize: typography.fontSize.xs,
    color: colors.danger,
    marginTop: 2,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
  },
  addButtonText: {
    color: colors.white,
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
