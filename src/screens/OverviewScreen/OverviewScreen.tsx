import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Input } from '~/components/Input/Input';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';
import { Toggle } from '~/components/Toggle/Toggle';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type ToggleSectionProps = {
  title: string;
  description: string;
  checked?: boolean;
};

const ToggleSection = ({ title, description, checked }: ToggleSectionProps) => {
  const { spacing } = useAppTheme();
  const [isChecked, setIsChecked] = useState(!!checked);

  return (
    <View flexDirection="row" gap={spacing.$12} alignItems="center">
      <View flexShrink={1}>
        <Text title={title} size="sm" weight="medium" />
        <Text title={description} color="mutedForeground" size="xs" />
      </View>
      <Toggle checked={isChecked} onPress={() => setIsChecked(!isChecked)} />
    </View>
  );
};

const ReviewCard = () => {
  return (
    <Card>
      <Text title="Total Revenue" size="sm" tracking="tight" />
      <Text title="$15231.89" size="2xl" weight="bold" />
      <Text title="+20.1% from last month" color="mutedForeground" size="sm" />
    </Card>
  );
};

const SubscriptionCard = () => {
  return (
    <Card>
      <Text title="Subscriptions" size="sm" tracking="tight" />
      <Text title="+2350" size="2xl" weight="bold" />
      <Text title="+180.1% from last month" color="mutedForeground" size="sm" />
    </Card>
  );
};

type TeamMemberProps = {
  name: string;
  email: string;
  roleId: string;
  avatar: string;
};

const TeamMember = ({ name, email, roleId, avatar }: TeamMemberProps) => {
  const roles: Role[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Viewer',
        description: 'Can view and comment',
      },
      {
        id: '2',
        name: 'Developer',
        description: 'Can view, comment, and edit',
      },
      {
        id: '3',
        name: 'Billing',
        description: 'Can view, comment, and manage billing',
      },
      {
        id: '4',
        name: 'Owner',
        description: 'Admin-level access to all resources',
      },
      {
        id: '5',
        name: 'Member',
        description: 'Can view and comment',
      },
    ],
    []
  );

  const { spacing } = useAppTheme();
  return (
    <View flexDirection="row" gap={spacing.$12} alignItems="center">
      <Image source={{ uri: avatar }} style={{ width: 32, height: 32 }} />
      <View flex={1}>
        <Text title={name} size="sm" weight="medium" />
        <Text title={email} color="mutedForeground" size="sm" />
      </View>
      <Text
        title={roles.find((role) => role.id === roleId)?.name}
        color="mutedForeground"
        size="xs"
      />
    </View>
  );
};

type Role = {
  id: string;
  name: string;
  description: string;
};

type Member = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  avatar: string;
};

const TeamMembersCard = () => {
  const teamMembers: Member[] = useMemo(
    () => [
      {
        id: '1',
        name: 'Sofia Davis',
        email: 'm@example.com',
        roleId: '4',
        avatar: 'https://ui.shadcn.com/avatars/01.png',
      },
      {
        id: '2',
        name: 'Jackson Lee',
        email: 'p@example.com',
        roleId: '1',
        avatar: 'https://ui.shadcn.com/avatars/02.png',
      },
      {
        id: '3',
        name: 'Isabella Nguyen',
        email: 'i@example.com',
        roleId: '1',
        avatar: 'https://ui.shadcn.com/avatars/03.png',
      },
    ],
    []
  );

  return (
    <Card>
      <Text title="Team Members" tracking="tight" weight="semibold" />
      <Text title="Invite your team members to collaborate" color="mutedForeground" size="sm" />
      {teamMembers.map(({ id, name, email, roleId, avatar }) => (
        <TeamMember key={id} name={name} email={email} roleId={roleId} avatar={avatar} />
      ))}
    </Card>
  );
};

type Message = {
  id: string;
  content: string;
  createdAt: Date;
  senderId: string;

  isRead: boolean;
};

const ChatCard = () => {
  const { spacing, colors } = useAppTheme();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hi, how can I help you today?',
      createdAt: new Date(),
      senderId: '1',
      isRead: true,
    },
    {
      id: '2',
      content: "Hey, I'm having trouble with my account",
      createdAt: new Date(),
      senderId: '2',
      isRead: true,
    },
    {
      id: '3',
      content: 'What seems to be the problem?',
      createdAt: new Date(),
      senderId: '1',
      isRead: true,
    },
    {
      id: '4',
      content: `I can't log in`,
      createdAt: new Date(),
      senderId: '2',
      isRead: true,
    },
  ]);

  return (
    <Card>
      <View gap={spacing.$12}>
        <Text title="Chat" tracking="tight" weight="semibold" />
        {messages.map(({ id, content, createdAt, senderId, isRead }) => (
          <View
            key={id}
            alignSelf={senderId === '1' ? 'flex-start' : 'flex-end'}
            borderRadius={spacing.$12}
            backgroundColor={senderId === '1' ? colors.muted : colors.primary}
            paddingHorizontal={spacing.$12}
            paddingVertical={spacing.$6}>
            <Text
              title={content}
              size="sm"
              color={senderId === '1' ? 'primary' : 'primaryForeground'}
            />
          </View>
        ))}
        <View flexDirection="row" gap={spacing.$6} alignItems="center">
          <View flex={1}>
            <Input placeholder="Type your message..." />
          </View>
          <View>
            <TouchableOpacity>
              <Ionicons name="send" size={24} color="foreground" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Card>
  );
};

const OverviewScreen = () => {
  const { colors, spacing } = useAppTheme();
  return (
    <Screen>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing.$12,
          gap: spacing.$16,
        }}>
        <ReviewCard />
        <SubscriptionCard />
        <TeamMembersCard />
        <ChatCard />

        <Card>
          <View gap={spacing.$16}>
            <View>
              <Text
                title="Create an account"
                size="2xl"
                weight="semibold"
                color="foreground"
                tracking="tight"
              />
              <Text
                title="Enter your email below to create your account"
                size="sm"
                color="mutedForeground"
                weight="light"
              />
            </View>
            <View gap={spacing.$12} flexDirection="row" justifyContent="center">
              <View flex={1}>
                <Button title="Google" onPress={() => {}} icon="logo-google" />
              </View>
              <View flex={1}>
                <Button title="Facebook" onPress={() => {}} icon="logo-facebook" />
              </View>
            </View>
            <View flexDirection="row" alignItems="center" gap={spacing.$6}>
              <View height={1} backgroundColor={colors.border} flex={1} />
              <Text
                title="Or continue with"
                color="mutedForeground"
                size="xs"
                textTransform="uppercase"
              />
              <View height={1} backgroundColor={colors.border} flex={1} />
            </View>
            <Input label="Email" placeholder="m@example.com" />
            <Input label="Password" placeholder="********" secureTextEntry />
            <Button title="Create Account" onPress={() => {}} />
          </View>
        </Card>
        <Card>
          <View marginBottom={spacing.$12}>
            <Text title="Payment Method" tracking="tight" weight="semibold" />
            <Text
              title="Add a new payment method to your account"
              size="sm"
              color="mutedForeground"
            />
          </View>
          <Input label="Name" placeholder="John Doe" />
          <Input label="City" placeholder="New York" />
          <Input label="Card number" placeholder="1234 5678 9012 3456" />
          <View flexDirection="row" gap={spacing.$6}>
            <View flex={1}>
              <Input label="Expires" placeholder="Month" />
            </View>
            <View flex={1}>
              <Input label="Year" placeholder="Year" />
            </View>
            <View flex={1}>
              <Input label="CVC" placeholder="123" secureTextEntry />
            </View>
          </View>
          <Button title="Continue" onPress={() => {}} />
        </Card>
        <Card>
          <View gap={spacing.$16}>
            <View>
              <Text title="Cookie Settings" tracking="tight" weight="semibold" />
              <Text title="Manage your cookie settings here" size="sm" color="mutedForeground" />
            </View>
            <ToggleSection
              title="Strictly Necessary"
              description="These cookies are essential to use the website and use its features"
            />
            <ToggleSection
              title="Functional Cookies"
              description="These cookies allow the website to provide personalized functionality"
              checked={true}
            />
            <ToggleSection
              title="Performance Cookies"
              description="These cookies help to improve the performance of the website"
            />
            <Button title="Save preferences" onPress={() => {}} />
          </View>
        </Card>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default OverviewScreen;
