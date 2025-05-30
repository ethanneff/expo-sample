import { Image } from 'expo-image';
import { useMemo } from 'react';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

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
        title={roles.find((role) => role.id === roleId)?.name || ''}
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

export const CardTeamMembers = () => {
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
