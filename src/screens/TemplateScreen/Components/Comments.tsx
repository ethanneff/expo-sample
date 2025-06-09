import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Dimensions, FlatList, type ListRenderItemInfo } from 'react-native';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { type CommentType } from '~/screens/TemplateScreen/Api/types';
import { useAppTheme } from '~/theme/useAppTheme';
import { queries } from '../Api/queries';

type Properties = {
  readonly postId: string;
};

const keyExtractor = (item: CommentType) => item.id;

export const Comments = ({ postId }: Properties) => {
  const { colors, spacing } = useAppTheme();
  const screenWidth = Dimensions.get('window').width;
  const { data, error, fetchNextPage, isPending } = useInfiniteQuery({
    ...queries.comments.all(postId),
    getNextPageParam: (lastPage: CommentType[], pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
    initialPageParam: 1,
  });

  const handleRenderItem = useCallback(({ item }: ListRenderItemInfo<CommentType>) => {
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: colors.background,
          borderColor: colors.border,
          borderRadius: spacing.$12,
          borderWidth: 1,
          padding: spacing.$12,
          width: screenWidth * 0.6,
        }}>
        <View style={{ marginBottom: spacing.$8 }}>
          <Text title={item.name} />
        </View>
        <Text title={item.body} variant="muted" />
      </View>
    );
  }, []);

  const handleEndReached = useCallback(() => {
    if (isPending) return;
    void fetchNextPage();
  }, [isPending, fetchNextPage]);

  if (isPending) return <Text title="Loading comments..." />;
  if (error) return <Text title="Error loading comments" />;

  return (
    <View style={{ flex: 1, paddingTop: spacing.$12 }}>
      <FlatList
        contentContainerStyle={{ gap: spacing.$12 }}
        data={data.pages.flat()}
        horizontal
        keyExtractor={keyExtractor}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        renderItem={handleRenderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
