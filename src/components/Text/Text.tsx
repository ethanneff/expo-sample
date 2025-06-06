import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { ColorName, useAppTheme } from '~/theme/useAppTheme';
import { Typescript } from '~/utils/Typescript';
import {
  FontFamily,
  geistFontFamily,
  geistMonoFontFamily,
  letterSpacing,
  textSize,
  Variant,
} from './utils';

type Props = {
  title: string;
  color?: ColorName;
  textAlign?: TextStyle['textAlign'];
  fontFamily?: FontFamily;
  ellipsizeMode?: TextProps['ellipsizeMode'];
  lineBreakMode?: TextProps['lineBreakMode'];
  numberOfLines?: TextProps['numberOfLines'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationColor?: ColorName;
  textDecorationStyle?: TextStyle['textDecorationStyle'];
  textTransform?: TextStyle['textTransform'];
  selectable?: boolean;
  accessible?: boolean;
  variant?: Variant;
};

const useTypography = (variant: Variant): TextStyle => {
  const { colors, spacing } = useAppTheme();
  switch (variant) {
    case 'h1':
      return {
        ...textSize['4xl'],
        ...geistFontFamily['extrabold'],
        ...letterSpacing['tight'],
      };
    case 'h2':
      return {
        ...textSize['3xl'],
        ...geistFontFamily['semibold'],
        ...letterSpacing['tight'],
        borderBottomWidth: 1.5,
        borderBottomColor: colors.border,
        paddingBottom: spacing.$4,
      };
    case 'h3':
      return {
        ...textSize['2xl'],
        ...geistFontFamily['semibold'],
        ...letterSpacing['tight'],
      };
    case 'h4':
      return {
        ...textSize['xl'],
        ...geistFontFamily['semibold'],
        ...letterSpacing['tight'],
      };
    case 'p':
      return {
        ...textSize['md'],
        ...geistFontFamily['regular'],
        ...letterSpacing['normal'],
      };
    case 'blockquote':
      return {
        borderLeftWidth: 2,
        borderLeftColor: colors.border,
        paddingLeft: spacing.$16,
        color: colors.mutedForeground,
        ...textSize['md'],
        ...geistFontFamily['regular'],
        ...letterSpacing['normal'],
      };
    case 'list':
      return {
        ...textSize['md'],
        ...geistFontFamily['regular'],
        ...letterSpacing['normal'],
      };
    case 'code':
      return {
        backgroundColor: colors.muted,
        ...textSize['sm'],
        ...geistMonoFontFamily['semibold'],
        ...letterSpacing['normal'],
      };
    case 'lead':
      return {
        color: colors.mutedForeground,
        ...textSize['xl'],
        ...geistFontFamily['regular'],
        ...letterSpacing['normal'],
      };
    case 'large':
      return {
        ...textSize['lg'],
        ...geistFontFamily['regular'],
        ...letterSpacing['normal'],
      };
    case 'small':
      return {
        ...textSize['sm'],
        ...geistFontFamily['medium'],
        ...letterSpacing['normal'],
      };
    case 'xsmall':
      return {
        color: colors.mutedForeground,
        ...textSize['xs'],
        ...geistFontFamily['regular'],
        ...letterSpacing['normal'],
      };
    case 'muted':
      return {
        color: colors.mutedForeground,
        ...textSize['sm'],
        ...geistFontFamily['regular'],
        ...letterSpacing['normal'],
      };
    default:
      return Typescript.assertNever(variant);
  }
};

export const Text = ({
  title,
  accessible,
  color,
  textAlign = 'left',
  ellipsizeMode,
  variant = 'p',
  lineBreakMode,
  numberOfLines,
  textTransform,
  textDecorationLine,
  textDecorationColor,
  textDecorationStyle,
  selectable = false,
  fontFamily,
}: Props) => {
  const { colors } = useAppTheme();
  const typography = useTypography(variant);
  const colorOverride = color ? { color: colors[color] } : {};

  return (
    <RNText
      accessible={accessible}
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      selectable={selectable}
      numberOfLines={numberOfLines}
      style={{
        ...typography,
        ...colorOverride,
        fontFamily,
        textAlign,
        textDecorationLine,
        textDecorationColor,
        textDecorationStyle,
        textTransform,
      }}>
      {title}
    </RNText>
  );
};
