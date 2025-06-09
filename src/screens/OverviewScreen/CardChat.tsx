import { Image } from 'expo-image';
import { useCallback, useRef, useState } from 'react';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input, type InputReference } from '~/components/Input/Input';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Chat = {
  id: string;
  messages: Record<string, Message>;
  people: Record<string, Person>;
};

type Me = Person & {
  avatar: string;
  id: string;
  name: string;
};

type Message = {
  content: string;
  createdAt: Date;
  id: string;
  isRead: boolean;
  personId: string;
};

type Person = {
  avatar: string;
  id: string;
  name: string;
};

const chat: Chat = {
  id: '1',
  messages: {
    1: {
      content: 'Hi, how can I help you today?',
      createdAt: new Date(),
      id: '1',
      isRead: true,
      personId: '1',
    },
    2: {
      content: "Hey, I'm having trouble with my account",
      createdAt: new Date(),
      id: '2',
      isRead: true,
      personId: '2',
    },
    3: {
      content: 'What seems to be the problem?',
      createdAt: new Date(),
      id: '3',
      isRead: true,
      personId: '1',
    },
    4: {
      content: `I can't log in`,
      createdAt: new Date(),
      id: '4',
      isRead: true,
      personId: '2',
    },
  },
  people: {
    1: {
      avatar: 'https://ui.shadcn.com/avatars/01.png',
      id: '1',
      name: 'Sofia Davis',
    },
    2: {
      avatar: 'https://ui.shadcn.com/avatars/02.png',
      id: '2',
      name: 'Jackson Lee',
    },
    3: {
      avatar: 'https://ui.shadcn.com/avatars/03.png',
      id: '3',
      name: 'Isabella Nguyen',
    },
    4: {
      avatar: 'https://ui.shadcn.com/avatars/04.png',
      id: '4',
      name: 'Mia Kim',
    },
    5: {
      avatar: 'https://ui.shadcn.com/avatars/05.png',
      id: '5',
      name: 'Jackson Lee',
    },
  },
};
const initialMessages = Object.values(chat.messages);

const me: Me = {
  avatar: 'https://ui.shadcn.com/avatars/01.png',
  id: '2',
  name: 'Sofia Davis',
};

const getRandomInclusive = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const CardChat = () => {
  const { colors, spacing } = useAppTheme();
  const messageReference = useRef<InputReference>(null);
  const message = useRef('');

  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleSend = useCallback(() => {
    setMessages((previous) => [
      ...previous,
      {
        content: message.current,
        createdAt: new Date(),
        id: String(previous.length + 1),
        isRead: true,
        personId: '2',
      },
    ]);
    messageReference.current?.clear();
    const wait = setTimeout(
      () => {
        setMessages((previous) => [
          ...previous,
          {
            content: 'How does that make you feel?',
            createdAt: new Date(),
            id: String(previous.length + 1),
            isRead: true,
            personId: getRandomInclusive(1, 5).toString(),
          },
        ]);
      },
      getRandomInclusive(500, 2000)
    );
    return () => {
      clearTimeout(wait);
    };
  }, [messages]);

  const handleChangeText = useCallback((text: string) => {
    message.current = text;
  }, []);

  return (
    <Card>
      <View gap={spacing.$12}>
        {messages.map(({ content, id, personId }) => {
          const isMe = personId === me.id;
          return (
            <View key={id}>
              {isMe ? null : (
                <View alignItems="center" flexDirection="row" gap={spacing.$4}>
                  <Image
                    source={{ uri: chat.people[personId].avatar }}
                    style={{ height: spacing.$20, width: spacing.$20 }}
                  />
                  <Text title={chat.people[personId].name} variant="xsmall" />
                </View>
              )}
              <View
                alignSelf={isMe ? 'flex-end' : 'flex-start'}
                backgroundColor={isMe ? colors.primary : colors.muted}
                borderRadius={spacing.$12}
                paddingHorizontal={spacing.$12}
                paddingVertical={spacing.$6}>
                <Text
                  color={isMe ? 'primaryForeground' : 'primary'}
                  title={content}
                  variant="small"
                />
              </View>
            </View>
          );
        })}
        <View alignItems="center" flexDirection="row" gap={spacing.$6}>
          <View flex={1}>
            <Input
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              defaultValue=""
              editable
              keyboardType="default"
              onChangeText={handleChangeText}
              onSubmitEditing={handleSend}
              placeholder="Type your message..."
              ref={messageReference}
              returnKeyType="done"
              submitBehavior="submit"
              textContentType="none"
            />
          </View>
          <Button icon="send" onPress={handleSend} title="" variant="outline" />
        </View>
      </View>
    </Card>
  );
};
