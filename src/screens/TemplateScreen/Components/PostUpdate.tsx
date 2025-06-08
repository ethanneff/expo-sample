import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRef } from 'react';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Modal } from '~/components/Modal/Modal';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { mutations } from '~/screens/TemplateScreen/Api/mutations';
import { queries } from '~/screens/TemplateScreen/Api/queries';
import { PostType } from '~/screens/TemplateScreen/Api/types';
import { useAppTheme } from '~/theme/useAppTheme';

type Props = {
  onClose: () => void;
  postId: string;
};

export const PostUpdate = ({ onClose, postId }: Props) => {
  const { spacing } = useAppTheme();
  const post = useQuery(queries.posts.detail(postId));
  const titleRef = useRef<string>(post.data?.title ?? '');
  const bodyRef = useRef<string>(post.data?.body ?? '');
  const queryClient = useQueryClient();

  const updatePost = useMutation({
    mutationFn: (data: PostType) => mutations.posts.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queries.posts.all().queryKey });
      onClose();
    },
  });

  const handleUpdatePost = () => {
    if (!post.data) return;
    const payload = { ...post.data, title: titleRef.current, body: bodyRef.current };
    updatePost.mutate(payload);
  };

  if (post.isPending && !post.data) return <Text title="Loading post..." />;
  if (post.error) return <Text title="Error loading post" />;

  return (
    <Modal>
      <View gap={spacing.$12}>
        <Text title="Create Post" />
        <Input
          submitBehavior="submit"
          onSubmitEditing={handleUpdatePost}
          defaultValue={post.data?.title}
          editable
          placeholder="Title"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
          textContentType="none"
          value={post.data?.title}
          onChangeText={(text) => (titleRef.current = text)}
        />
        <Input
          defaultValue={post.data?.body}
          editable
          submitBehavior="submit"
          onSubmitEditing={handleUpdatePost}
          placeholder="Body"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
          textContentType="none"
          value={post.data?.body}
          onChangeText={(text) => (bodyRef.current = text)}
        />
        <View flexDirection="row" gap={spacing.$4} justifyContent="center">
          <Button title="Update" onPress={handleUpdatePost} variant="primary" />
          <Button title="Close" onPress={onClose} variant="outline" />
        </View>
      </View>
    </Modal>
  );
};
