import { type TextStyle } from 'react-native';
import {
  geistFontFamily,
  geistMonoFontFamily,
  letterSpacing,
  textSize,
  type Variant,
} from '~/components/Text/utilities';
import { useAppTheme } from '~/theme/useAppTheme';
import { Typescript } from '~/utils/Typescript';

export const useTypography = (variant: Variant): TextStyle => {
  const { colors, spacing } = useAppTheme();
  switch (variant) {
    case 'blockquote': {
      return {
        borderLeftColor: colors.border,
        borderLeftWidth: 2,
        color: colors.mutedForeground,
        paddingLeft: spacing.$16,
        ...textSize.md,
        ...geistFontFamily.regular,
        ...letterSpacing.normal,
      };
    }
    case 'code': {
      return {
        backgroundColor: colors.muted,
        ...textSize.sm,
        ...geistMonoFontFamily.semibold,
        ...letterSpacing.normal,
      };
    }
    case 'h1': {
      return {
        ...textSize['4xl'],
        ...geistFontFamily.extrabold,
        ...letterSpacing.tight,
      };
    }
    case 'h2': {
      return {
        ...textSize['3xl'],
        ...geistFontFamily.semibold,
        ...letterSpacing.tight,
        borderBottomColor: colors.border,
        borderBottomWidth: 1.5,
        paddingBottom: spacing.$4,
      };
    }
    case 'h3': {
      return {
        ...textSize['2xl'],
        ...geistFontFamily.semibold,
        ...letterSpacing.tight,
      };
    }
    case 'h4': {
      return {
        ...textSize.xl,
        ...geistFontFamily.semibold,
        ...letterSpacing.tight,
      };
    }
    case 'large': {
      return {
        ...textSize.lg,
        ...geistFontFamily.regular,
        ...letterSpacing.normal,
      };
    }
    case 'lead': {
      return {
        color: colors.mutedForeground,
        ...textSize.xl,
        ...geistFontFamily.regular,
        ...letterSpacing.normal,
      };
    }
    case 'muted': {
      return {
        color: colors.mutedForeground,
        ...textSize.sm,
        ...geistFontFamily.regular,
        ...letterSpacing.normal,
      };
    }
    case 'p': {
      return {
        ...textSize.md,
        ...geistFontFamily.regular,
        ...letterSpacing.normal,
      };
    }
    case 'small': {
      return {
        ...textSize.sm,
        ...geistFontFamily.medium,
        ...letterSpacing.normal,
      };
    }
    case 'xsmall': {
      return {
        color: colors.mutedForeground,
        ...textSize.xs,
        ...geistFontFamily.regular,
        ...letterSpacing.normal,
      };
    }
    default: {
      return Typescript.assertNever(variant);
    }
  }
};
