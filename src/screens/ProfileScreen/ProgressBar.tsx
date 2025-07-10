import MaskedView from '@react-native-masked-view/masked-view';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { type ColorName, useAppTheme } from '~/theme/useAppTheme';

type Properties = {
  readonly color: ColorName;
  readonly current: number;
  readonly total: number;
};

export const ProgressBar = ({ color, current, total }: Properties) => {
  const { borderRadius, colors, spacing } = useAppTheme();
  const percent = Math.floor((current / total) * 100);
  const inversePercent = 100 - percent;

  return (
    <View flex={1}>
      <View backgroundColor={colors.secondary} borderRadius={borderRadius.$24}>
        <Text accessible={false} fontFamily="Geist-SemiBold" title=" " variant="p" />
        <View
          absoluteFillObject
          backgroundColor={colors[color]}
          borderBottomLeftRadius={borderRadius.$24}
          borderBottomRightRadius={0}
          borderTopLeftRadius={borderRadius.$24}
          borderTopRightRadius={0}
          width={`${percent}%`}>
          <View
            backgroundColor="white"
            borderRadius={borderRadius.$24}
            height={spacing.$4}
            marginHorizontal={spacing.$8}
            marginTop={spacing.$6}
            opacity={0.5}
          />
        </View>
        <View absoluteFillObject alignItems="center" justifyContent="center">
          <MaskedView
            maskElement={
              <View alignItems="center" flex={1} justifyContent="center">
                <Text fontFamily="Geist-SemiBold" title={`${current} / ${total}`} variant="small" />
              </View>
            }
            style={{ flexDirection: 'row', height: '100%' }}>
            <View backgroundColor={colors.primaryForeground} flex={percent} />
            <View backgroundColor={colors.primary} flex={inversePercent} opacity={0.5} />
          </MaskedView>
        </View>
      </View>
    </View>
  );
};
