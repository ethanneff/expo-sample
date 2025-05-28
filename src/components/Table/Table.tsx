import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type TableProps = {
  headers: string[];
  rows: string[][];
};

export const Table = ({ headers, rows }: TableProps) => {
  const { spacing, colors } = useAppTheme();

  return (
    <View borderWidth={1} borderColor={colors.border}>
      <View flexDirection="row">
        {headers.map((header, index) => (
          <View
            key={index}
            flexDirection="row"
            flex={1}
            borderBottomWidth={1}
            borderBottomColor={colors.border}
            borderRightWidth={index < headers.length - 1 ? 1 : 0}
            borderRightColor={colors.border}>
            <View padding={spacing.$4}>
              <Text title={header} weight="semibold" />
            </View>
          </View>
        ))}
      </View>
      {rows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          flexDirection="row"
          borderBottomWidth={rowIndex < rows.length - 1 ? 1 : 0}
          borderBottomColor={colors.border}
          backgroundColor={rowIndex % 2 === 0 ? colors.muted : undefined}>
          {row.map((cell, cellIndex) => (
            <View
              flex={1}
              key={cellIndex}
              borderRightWidth={cellIndex < headers.length - 1 ? 1 : 0}
              borderRightColor={colors.border}>
              <View padding={spacing.$4}>
                <Text title={cell} color={'primary'} />
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};
