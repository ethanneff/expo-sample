// eslint-disable-next-line no-restricted-imports
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';
import { type ColorName, useAppTheme } from '~/theme/useAppTheme';
import { Typescript } from '~/utils/Typescript';
import {
  type FontFamily,
  geistFontFamily,
  geistMonoFontFamily,
  letterSpacing,
  textSize,
  type Variant,
} from './utils';

type Properties = {
  readonly accessible?: boolean;
  readonly color?: ColorName;
  readonly ellipsizeMode?: TextProps['ellipsizeMode'];
  readonly fontFamily?: FontFamily;
  readonly lineBreakMode?: TextProps['lineBreakMode'];
  readonly numberOfLines?: TextProps['numberOfLines'];
  readonly selectable?: boolean;
  readonly textAlign?: TextStyle['textAlign'];
  readonly textDecorationColor?: ColorName;
  readonly textDecorationLine?: TextStyle['textDecorationLine'];
  readonly textDecorationStyle?: TextStyle['textDecorationStyle'];
  readonly textTransform?: TextStyle['textTransform'];
  readonly title: string;
  readonly variant?: Variant;
};

const useTypography = (variant: Variant): TextStyle => {
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
    case 'list': {
      return {
        ...textSize.md,
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

export const Text = ({
  accessible,
  color = 'foreground',
  ellipsizeMode,
  fontFamily,
  lineBreakMode,
  numberOfLines,
  selectable = false,
  textAlign = 'left',
  textDecorationColor,
  textDecorationLine,
  textDecorationStyle,
  textTransform,
  title,
  variant = 'p',
}: Properties) => {
  const { colors } = useAppTheme();
  const typography = useTypography(variant);
  const colorOverride = color ? { color: colors[color] } : {};

  return (
    <RNText
      accessible={accessible}
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      selectable={selectable}
      style={{
        ...typography,
        ...colorOverride,
        fontFamily,
        textAlign,
        textDecorationColor,
        textDecorationLine,
        textDecorationStyle,
        textTransform,
      }}>
      {title}
    </RNText>
  );
};
