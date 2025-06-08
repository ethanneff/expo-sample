import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '~/components/Button/Button';
import { Input } from '~/components/Input/Input';
import { Modal } from '~/components/Modal/Modal';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { mutations } from '~/screens/TemplateScreen/Api/mutations';
import { PostType } from '~/screens/TemplateScreen/Api/types';

type Props = {
  onClose: () => void;
};

export const PostCreate = ({ onClose }: Props) => {
  const [state, setState] = useState({
    title: '',
    body: '',
  });

  const createPost = useMutation({
    mutationFn: (data: PostType) => mutations.posts.create(data),
  });

  const handleCreatePost = () => {
    createPost.mutate({
      id: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      title: state.title,
      body: state.body,
    });
    onClose();
  };

  return (
    <Modal>
      <View>
        <Text title="Create Post" />
        <Input
          submitBehavior="submit"
          onSubmitEditing={handleCreatePost}
          defaultValue={state.title}
          editable
          placeholder="Title"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
          textContentType="none"
          value={state.title}
          onChangeText={(text) => setState({ ...state, title: text })}
        />
        <Input
          defaultValue={state.body}
          editable
          submitBehavior="submit"
          onSubmitEditing={handleCreatePost}
          placeholder="Body"
          autoCapitalize="none"
          autoComplete="off"
          autoCorrect={false}
          keyboardType="default"
          returnKeyType="done"
          textContentType="none"
          value={state.body}
          onChangeText={(text) => setState({ ...state, body: text })}
        />
        <Button title="Close" onPress={onClose} variant="outline" />
      </View>
    </Modal>
  );
};
