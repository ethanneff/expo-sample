import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { ColorName, useAppTheme } from '~/theme/useAppTheme';
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
  size?: TextSize;
  family?: FontFamily;
  fontStyle?: TextStyle['fontStyle'];
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
  selectable?: boolean;
};

export const Text = ({
  title,
  color = 'foreground',
  size = 'md',
  family = 'Geist',
  fontStyle = 'normal',
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
  selectable = false,
}: Props) => {
  const { colors } = useAppTheme();
  const { fontSize, lineHeight } = getTextSize(size);
  const fontFamily = getFontFamily(family, weight);
  const letterSpacing = getLetterSpacing(tracking);

  return (
    <RNText
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      selectable={selectable}
      numberOfLines={numberOfLines}
      style={{
        color: colors[color],
        textAlign: align,
        letterSpacing,
        fontSize,
        lineHeight,
        fontStyle,
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
