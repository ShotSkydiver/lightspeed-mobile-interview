import { StyleSheet } from 'react-native';
import { colors, spacing, typography, borderRadius } from './theme';

/**
 * Styles for the main App component
 */
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.huge,
    marginBottom: spacing.huge,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.md,
    color: colors.textSecondary,
  },
  error: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.bold,
    color: colors.danger,
    marginVertical: spacing.sm,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
    marginTop: spacing.lg,
  },
  hint: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.highlight,
    borderRadius: borderRadius.md,
  },
  hintText: {
    fontSize: typography.fontSize.sm,
    color: colors.highlightText,
    textAlign: 'center',
  },
  footer: {
    marginTop: spacing.huge,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
  },
  footerSubtext: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    marginTop: 4,
  },
  todoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  logoutText: {
    fontSize: typography.fontSize.md,
    color: colors.danger,
    fontWeight: typography.fontWeight.semibold,
  },
  todoList: {
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  emptyStateSubtext: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
  },
  stats: {
    paddingVertical: spacing.lg,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statsText: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
});
