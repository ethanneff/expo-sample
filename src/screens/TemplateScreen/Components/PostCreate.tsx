import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Modal } from '~/components/Modal/Modal';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { mutations } from '~/screens/TemplateScreen/Api/mutations';
import { queries } from '~/screens/TemplateScreen/Api/queries';
import { type PostType } from '~/screens/TemplateScreen/Api/types';
import { useAppTheme } from '~/theme/useAppTheme';

type Properties = {
  readonly onClose: () => void;
};

export const PostCreate = ({ onClose }: Properties) => {
  const { spacing } = useAppTheme();
  const [state, setState] = useState({ body: '', title: '' });
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: PostType) => mutations.posts.create(data),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: queries.posts.all().queryKey });
      onClose();
    },
  });

  const handleCreatePost = useCallback(() => {
    mutate({
      body: state.body,
      createdAt: new Date().toISOString(),
      id: uuidv4(),
      title: state.title,
      updatedAt: new Date().toISOString(),
    });
  }, [state, mutate]);

  const handleChangeTitle = useCallback(
    (text: string) => {
      setState({ ...state, title: text });
    },
    [state]
  );

  const handleChangeBody = useCallback(
    (text: string) => {
      setState({ ...state, body: text });
    },
    [state]
  );

  return (
    <Modal>
      <View gap={spacing.$8} minWidth="80%">
        <Text title="Create Post" variant="h3" />
        <Input
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          defaultValue={state.title}
          editable
          keyboardType="default"
          onChangeText={handleChangeTitle}
          onSubmitEditing={handleCreatePost}
          placeholder="Title"
          returnKeyType="done"
          submitBehavior="submit"
          textContentType="none"
          value={state.title}
        />
        <Input
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          defaultValue={state.body}
          editable
          keyboardType="default"
          onChangeText={handleChangeBody}
          onSubmitEditing={handleCreatePost}
          placeholder="Body"
          returnKeyType="done"
          submitBehavior="submit"
          textContentType="none"
          value={state.body}
        />
        <View flexDirection="row" gap={spacing.$8} justifyContent="center">
          <View flex={1}>
            <Button onPress={onClose} title="Close" variant="outline" />
          </View>
          <View flex={1}>
            <Button onPress={handleCreatePost} title="Create" variant="primary" />
          </View>
        </View>
      </View>
    </Modal>
  );
};
