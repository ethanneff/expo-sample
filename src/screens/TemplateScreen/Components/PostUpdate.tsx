import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Modal } from '~/components/Modal/Modal';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { mutations } from '~/screens/TemplateScreen/Api/mutations';
import { queries } from '~/screens/TemplateScreen/Api/queries';
import { type PostType } from '~/screens/TemplateScreen/Api/types';
import { useAppTheme } from '~/theme/useAppTheme';

type UpdatePostFormProperties = {
  readonly onClose: () => void;
  readonly post: PostType;
};

const PostUpdateForm = ({ onClose, post }: UpdatePostFormProperties) => {
  const titleReference = useRef<string>(post.title);
  const { spacing } = useAppTheme();
  const bodyReference = useRef<string>(post.body);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: PostType) => mutations.posts.update(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queries.posts.all().queryKey });
      onClose();
    },
  });

  const handleUpdatePost = useCallback(() => {
    const payload = { ...post, body: bodyReference.current, title: titleReference.current };
    mutate(payload);
  }, [mutate, post]);

  const handleChangeTitle = useCallback((text: string) => {
    titleReference.current = text;
  }, []);

  const handleChangeBody = useCallback((text: string) => {
    bodyReference.current = text;
  }, []);

  return (
    <View gap={spacing.$8} minWidth="80%">
      <Input
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        defaultValue={post.title}
        editable
        keyboardType="default"
        onChangeText={handleChangeTitle}
        onSubmitEditing={handleUpdatePost}
        placeholder="Title"
        returnKeyType="done"
        submitBehavior="submit"
        textContentType="none"
        value={post.title}
      />
      <Input
        autoCapitalize="none"
        autoComplete="off"
        autoCorrect={false}
        defaultValue={post.body}
        editable
        keyboardType="default"
        onChangeText={handleChangeBody}
        onSubmitEditing={handleUpdatePost}
        placeholder="Body"
        returnKeyType="done"
        submitBehavior="submit"
        textContentType="none"
        value={post.body}
      />
      <View flexDirection="row" gap={spacing.$8}>
        <View flex={1}>
          <Button onPress={onClose} title="Close" variant="outline" />
        </View>
        <View flex={1}>
          <Button onPress={handleUpdatePost} title="Update" variant="primary" />
        </View>
      </View>
    </View>
  );
};

type Properties = {
  readonly onClose: () => void;
  readonly postId: string;
};

// eslint-disable-next-line react/no-multi-comp
export const PostUpdate = ({ onClose, postId }: Properties) => {
  const { spacing } = useAppTheme();
  const post = useQuery(queries.posts.detail(postId));

  return (
    <Modal>
      <View gap={spacing.$8}>
        <Text title="Update Post" variant="h3" />
        {post.isPending ? <Text title="Loading post..." /> : null}
        {post.error ? <Text title="Error loading post" /> : null}
        {post.data ? <PostUpdateForm onClose={onClose} post={post.data} /> : null}
      </View>
    </Modal>
  );
};
