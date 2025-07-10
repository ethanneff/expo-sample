// eslint-disable-next-line no-restricted-imports
import { Text as RNText, type TextProps, type TextStyle } from 'react-native';
import { useTypography } from '~/components/Text/useTypography';
import { type ColorName, useAppTheme } from '~/theme/useAppTheme';
import { type FontFamily, type Variant } from './utilities';

type Properties = {
  readonly accessible?: boolean;
  readonly color?: ColorName;
  readonly ellipsizeMode?: TextProps['ellipsizeMode'];
  readonly fontFamily?: FontFamily;
  readonly lineBreakMode?: TextProps['lineBreakMode'];
  readonly numberOfLines?: TextProps['numberOfLines'];
  readonly selectable?: boolean;
  readonly style?: TextStyle;
  readonly textAlign?: TextStyle['textAlign'];
  readonly textDecorationColor?: ColorName;
  readonly textDecorationLine?: TextStyle['textDecorationLine'];
  readonly textDecorationStyle?: TextStyle['textDecorationStyle'];
  readonly textTransform?: TextStyle['textTransform'];
  readonly title: string;
  readonly variant?: Variant;
};

export const Text = ({
  accessible,
  color = 'foreground',
  ellipsizeMode,
  fontFamily,
  lineBreakMode,
  numberOfLines,
  selectable = false,
  style,
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

  return (
    <RNText
      accessible={accessible}
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      selectable={selectable}
      style={{
        ...typography,
        color: colors[color],
        fontFamily,
        textAlign,
        textDecorationColor,
        textDecorationLine,
        textDecorationStyle,
        textTransform,
        ...style,
      }}>
      {title}
    </RNText>
  );
};
