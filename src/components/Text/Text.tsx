import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { ColorName } from '~/theme/colors';
import { useAppTheme } from '~/theme/useAppTheme';
import { FontFamily, getFontFamily, getTextSize, TextSize, TextWeight } from './utils';

type Props = {
  title: string;
  color: ColorName;
  size: TextSize;
  family: FontFamily;
  weight: TextWeight;
  align: TextStyle['textAlign'];
  ellipsizeMode?: TextProps['ellipsizeMode'];
  lineBreakMode?: TextProps['lineBreakMode'];
  numberOfLines?: TextProps['numberOfLines'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  textDecorationColor?: ColorName;
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
  textTransform,
  textDecorationLine,
  textDecorationColor,
}: Props) => {
  const { colors } = useAppTheme();
  const { fontSize, lineHeight } = getTextSize(size);
  const fontFamily = getFontFamily(family, weight);

  return (
    <RNText
      ellipsizeMode={ellipsizeMode}
      lineBreakMode={lineBreakMode}
      numberOfLines={numberOfLines}
      style={{
        color: colors[color],
        textAlign: align,
        fontSize,
        lineHeight,
        textDecorationLine,
        textDecorationColor,
        textTransform,
        fontFamily,
      }}>
      {title}
    </RNText>
  );
};
