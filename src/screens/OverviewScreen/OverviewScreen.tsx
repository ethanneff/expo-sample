import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useMemo, useState } from 'react';
import { Text as RNText, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Divider } from '~/components/Divider/Divider';
import { Input } from '~/components/Input/Input';
import { Screen } from '~/components/Screen/Screen';
import { Table } from '~/components/Table/Table';
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

const TypographyCard = () => {
  const { spacing, colors } = useAppTheme();

  return (
    <Card>
      <View gap={spacing.$12}>
        <Text title="The Joke Tax Chronicles" size="4xl" weight="bold" tracking="tight" />
        <Text title="Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money." />
        <Text title="The King's Plan" size="3xl" weight="semibold" tracking="tight" />
        <Divider />
        <RNText>
          <Text title="The king thought long and hard, and finally came up with " />
          <Text title="a brilliant plan" decoration="underline" weight="medium" />
          <Text title=": he would tax the jokes in the kingdom." />
        </RNText>
        <View
          borderLeftWidth={spacing.$2}
          borderLeftColor={colors.border}
          paddingLeft={spacing.$12}>
          <Text
            fontStyle="italic"
            title={`"After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege."`}
            color="mutedForeground"
          />
        </View>
        <Text title="The Joke Tax" size="2xl" weight="semibold" tracking="tight" />
        <Text title="The king's subjects were not amused. They grumbled and complained, but the king was firm:" />
        <View flexDirection="row" gap={spacing.$4}>
          <Text title="•" />
          <Text title="1st level of puns: 5 gold coins" selectable />
        </View>
        <View flexDirection="row" gap={spacing.$4}>
          <Text title="•" />
          <Text title="2nd level of jokes: 10 gold coins" selectable />
        </View>
        <View flexDirection="row" gap={spacing.$4}>
          <Text title="•" />
          <Text title="3rd level of one-liners: 20 gold coins" selectable />
        </View>
        <Text title="As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester." />
        <Text title="Jokester's Revolt" size="2xl" weight="semibold" tracking="tight" />
        <Text title="Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester." />
        <Text title="And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop." />
        <Text title="The People's Rebellion" size="2xl" weight="semibold" tracking="tight" />
        <Text title="The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke." />
        <Table
          headers={["King's Treasury", "People's happiness"]}
          rows={[
            ['Empty', 'Overflowing'],
            ['Modest', 'Satisfied'],
            ['Full', 'Ecstatic'],
          ]}
        />
        <Text title="The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after." />
        <Text title="The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas." />
      </View>
    </Card>
  );
};

const ButtonCard = () => {
  const { spacing } = useAppTheme();
  return (
    <Card>
      <View gap={spacing.$12}>
        <Button title="Full Width" onPress={() => {}} variant="outline" />
        <View gap={spacing.$12} flexDirection="row" flexWrap="wrap" justifyContent="center">
          <Button title="Primary" onPress={() => {}} variant="primary" />
          <Button title="Secondary" onPress={() => {}} variant="secondary" />
          <Button title="Destructive" onPress={() => {}} variant="destructive" />
          <Button title="Outline" onPress={() => {}} variant="outline" />
          <Button title="Ghost" onPress={() => {}} variant="ghost" />
          <Button title="Link" onPress={() => {}} variant="link" />
          <Button title="Disabled" onPress={() => {}} variant="primary" disabled />
          <Button title="Loading" onPress={() => {}} variant="outline" loading />
          <Button title="" onPress={() => {}} variant="outline" icon="logo-google" />
          <Button title="With Icon" onPress={() => {}} variant="outline" icon="logo-google" />
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
        <TypographyCard />
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
            <Input
              label="Email"
              placeholder="m@example.com"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
              defaultValue=""
              editable={true}
              onChangeText={() => {}}
              submitBehavior="submit"
              onSubmitEditing={() => {}}
              returnKeyType="done"
              textContentType="emailAddress"
            />
            <Input
              label="Password"
              placeholder="********"
              secureTextEntry
              keyboardType="visible-password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect={false}
              defaultValue=""
              editable={true}
              onChangeText={() => {}}
              submitBehavior="submit"
              onSubmitEditing={() => {}}
              returnKeyType="done"
              textContentType="password"
            />
            <Button title="Create Account" onPress={() => {}} variant="primary" />
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
          <Input
            label="Name"
            placeholder="John Doe"
            keyboardType="default"
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect={false}
            defaultValue=""
            editable={true}
            onChangeText={() => {}}
            submitBehavior="submit"
            onSubmitEditing={() => {}}
            returnKeyType="done"
            textContentType="name"
          />
          <Input
            label="City"
            placeholder="New York"
            keyboardType="default"
            autoCapitalize="none"
            autoComplete="address-line2"
            autoCorrect={false}
            defaultValue=""
            editable={true}
            onChangeText={() => {}}
            submitBehavior="submit"
            onSubmitEditing={() => {}}
            returnKeyType="done"
            textContentType="addressCity"
          />
          <Input
            label="Card number"
            placeholder="1234 5678 9012 3456"
            keyboardType="number-pad"
            autoCapitalize="none"
            autoComplete="cc-number"
            autoCorrect={false}
            defaultValue=""
            editable={true}
            onChangeText={() => {}}
            submitBehavior="submit"
            onSubmitEditing={() => {}}
            returnKeyType="done"
            textContentType="creditCardNumber"
          />
          <View flexDirection="row" gap={spacing.$6}>
            <View flex={1}>
              <Input
                label="Expires"
                placeholder="Month"
                keyboardType="number-pad"
                autoComplete="cc-exp-month"
                editable={true}
                onChangeText={() => {}}
                defaultValue=""
                autoCorrect={false}
                autoCapitalize="none"
                submitBehavior="submit"
                onSubmitEditing={() => {}}
                returnKeyType="done"
                textContentType="creditCardExpirationMonth"
              />
            </View>
            <View flex={1}>
              <Input
                label="Year"
                placeholder="Year"
                keyboardType="number-pad"
                autoComplete="cc-exp-year"
                autoCorrect={false}
                editable={true}
                onChangeText={() => {}}
                defaultValue=""
                submitBehavior="submit"
                autoCapitalize="none"
                onSubmitEditing={() => {}}
                returnKeyType="done"
                textContentType="creditCardExpirationYear"
              />
            </View>
            <View flex={1}>
              <Input
                label="CVC"
                placeholder="123"
                secureTextEntry
                keyboardType="number-pad"
                autoComplete="cc-csc"
                autoCorrect={false}
                defaultValue=""
                editable={true}
                onChangeText={() => {}}
                textContentType="creditCardSecurityCode"
                returnKeyType="done"
                onSubmitEditing={() => {}}
                submitBehavior="submit"
                autoCapitalize="none"
              />
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
