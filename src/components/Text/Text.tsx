import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { ColorName } from '~/theme/colors';
import { useAppTheme } from '~/theme/useAppTheme';
import {
  FontFamily,
  getFontFamily,
  getLetterSpacing,
  getTextSize,
  TextLetterSpacing,
  TextSize,
  TextWeight,
} from './utils';

type Props = {
  title: string;
  color?: ColorName;
  size: TextSize;
  family?: FontFamily;
  weight?: TextWeight;
  align?: TextStyle['textAlign'];
  ellipsizeMode?: TextProps['ellipsizeMode'];
  lineBreakMode?: TextProps['lineBreakMode'];
  numberOfLines?: TextProps['numberOfLines'];
  tracking?: TextLetterSpacing;
  decoration?: TextStyle['textDecorationLine'];
  decorationColor?: ColorName;
  decorationStyle?: TextStyle['textDecorationStyle'];
  textTransform?: TextStyle['textTransform'];
};

export const Text = ({
  title,
  color = 'foreground',
  size = 'md',
  family = 'Geist',
  weight = 'regular',
  align = 'left',
  ellipsizeMode,
  lineBreakMode,
  numberOfLines,
  tracking = 'normal',
  textTransform,
  decoration,
  decorationColor,
  decorationStyle,
}: Props) => {
  const { colors } = useAppTheme();
  const { fontSize, lineHeight } = getTextSize(size);
  const fontFamily = getFontFamily(family, weight);
  const letterSpacing = getLetterSpacing(tracking);

  return (
    <RNText
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      style={{
        color: colors[color],
        textAlign: align,
        letterSpacing,
        fontSize,
        lineHeight,
        textDecorationLine: decoration,
        textDecorationColor: decorationColor,
        textDecorationStyle: decorationStyle,
        textTransform,
        fontFamily,
      }}>
      {title}
    </RNText>
  );
};
