import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type TableProperties = {
  readonly headers: string[];
  readonly rows: string[][];
};

export const Table = ({ headers, rows }: TableProperties) => {
  const { colors, spacing } = useAppTheme();

  return (
    <View borderColor={colors.border} borderWidth={1}>
      <View flexDirection="row">
        {headers.map((header, index) => (
          <View
            borderBottomColor={colors.border}
            borderBottomWidth={1}
            borderRightColor={colors.border}
            borderRightWidth={index < headers.length - 1 ? 1 : 0}
            flex={1}
            flexDirection="row"
            key={index}>
            <View padding={spacing.$4}>
              <Text fontFamily="Geist-Bold" title={header} />
            </View>
          </View>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View
          backgroundColor={rowIndex % 2 === 0 ? colors.muted : undefined}
          borderBottomColor={colors.border}
          borderBottomWidth={rowIndex < rows.length - 1 ? 1 : 0}
          flexDirection="row"
          key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <View
              borderRightColor={colors.border}
              borderRightWidth={cellIndex < headers.length - 1 ? 1 : 0}
              flex={1}
              key={cellIndex}>
              <View padding={spacing.$4}>
                <Text color="primary" title={cell} />
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
