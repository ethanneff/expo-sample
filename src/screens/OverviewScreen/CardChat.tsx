import { Image } from 'expo-image';
import { useRef, useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Chat = {
  id: string;
  people: Record<string, Person>;
  messages: Record<string, Message>;
};

type Person = {
  id: string;
  name: string;
  avatar: string;
};

type Message = {
  id: string;
  content: string;
  createdAt: Date;
  personId: string;
  isRead: boolean;
};

type Me = Person & {
  id: string;
  name: string;
  avatar: string;
};

const chat: Chat = {
  id: '1',
  people: {
    '1': {
      id: '1',
      name: 'Sofia Davis',
      avatar: 'https://ui.shadcn.com/avatars/01.png',
    },
    '2': {
      id: '2',
      name: 'Jackson Lee',
      avatar: 'https://ui.shadcn.com/avatars/02.png',
    },
    '3': {
      id: '3',
      name: 'Isabella Nguyen',
      avatar: 'https://ui.shadcn.com/avatars/03.png',
    },
    '4': {
      id: '4',
      name: 'Mia Kim',
      avatar: 'https://ui.shadcn.com/avatars/04.png',
    },
    '5': {
      id: '5',
      name: 'Jackson Lee',
      avatar: 'https://ui.shadcn.com/avatars/05.png',
    },
  },
  messages: {
    '1': {
      id: '1',
      content: 'Hi, how can I help you today?',
      createdAt: new Date(),
      personId: '1',
      isRead: true,
    },
    '2': {
      id: '2',
      content: "Hey, I'm having trouble with my account",
      createdAt: new Date(),
      personId: '2',
      isRead: true,
    },
    '3': {
      id: '3',
      content: 'What seems to be the problem?',
      createdAt: new Date(),
      personId: '1',
      isRead: true,
    },
    '4': {
      id: '4',
      content: `I can't log in`,
      createdAt: new Date(),
      personId: '2',
      isRead: true,
    },
  },
};
const initialMessages = Object.values(chat.messages);

const me: Me = {
  id: '2',
  name: 'Sofia Davis',
  avatar: 'https://ui.shadcn.com/avatars/01.png',
};

const getRandomInclusive = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const CardChat = () => {
  const { spacing, colors } = useAppTheme();
  const messageRef = useRef<TextInput>(null);
  const message = useRef('');

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        content: message.current,
        createdAt: new Date(),
        personId: '2',
        isRead: true,
      },
    ]);
    messageRef.current?.clear();
    const wait = setTimeout(
      () => {
        setMessages((prev) => [
          ...prev,
          {
            id: String(prev.length + 1),
            content: 'How does that make you feel?',
            createdAt: new Date(),
            personId: getRandomInclusive(1, 5).toString(),
            isRead: true,
          },
        ]);
      },
      getRandomInclusive(500, 2000)
    );
    return () => clearTimeout(wait);
  };

  const handleChangeText = (text: string) => {
    message.current = text;
  };

  return (
    <Card>
      <View gap={spacing.$12}>
        {messages.map(({ id, content, createdAt, personId, isRead }) => {
          const isMe = personId === me.id;
          return (
            <View key={id}>
              {!isMe ? (
                <View flexDirection="row" gap={spacing.$4} alignItems="center">
                  <Image
                    source={{ uri: chat.people[personId].avatar }}
                    style={{ width: spacing.$20, height: spacing.$20 }}
                  />
                  <Text title={chat.people[personId].name} variant="xsmall" />
                </View>
              ) : null}
              <View
                alignSelf={isMe ? 'flex-end' : 'flex-start'}
                borderRadius={spacing.$12}
                backgroundColor={isMe ? colors.primary : colors.muted}
                paddingHorizontal={spacing.$12}
                paddingVertical={spacing.$6}>
                <Text
                  title={content}
                  variant="small"
                  color={isMe ? 'primaryForeground' : 'primary'}
                />
              </View>
            </View>
          );
        })}
        <View flexDirection="row" gap={spacing.$6} alignItems="center">
          <View flex={1}>
            <Input
              ref={messageRef}
              defaultValue=""
              onChangeText={handleChangeText}
              placeholder="Type your message..."
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              keyboardType="default"
              returnKeyType="done"
              textContentType="none"
              editable={true}
              submitBehavior="submit"
              onSubmitEditing={handleSend}
            />
          </View>
          <Button title="" onPress={handleSend} variant="outline" icon="send" />
        </View>
      </View>
    </Card>
  );
};
