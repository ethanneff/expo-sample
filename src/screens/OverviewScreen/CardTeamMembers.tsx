import { Image } from 'expo-image';
import { useMemo } from 'react';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type TeamMemberProperties = {
  readonly avatar: string;
  readonly email: string;
  readonly name: string;
  readonly roleId: string;
};

const TeamMember = ({ avatar, email, name, roleId }: TeamMemberProperties) => {
  const roles: Role[] = useMemo(
    () => [
      {
        description: 'Can view and comment',
        id: '1',
        name: 'Viewer',
      },
      {
        description: 'Can view, comment, and edit',
        id: '2',
        name: 'Developer',
      },
      {
        description: 'Can view, comment, and manage billing',
        id: '3',
        name: 'Billing',
      },
      {
        description: 'Admin-level access to all resources',
        id: '4',
        name: 'Owner',
      },
      {
        description: 'Can view and comment',
        id: '5',
        name: 'Member',
      },
    ],
    []
  );

  const { spacing } = useAppTheme();
  return (
    <View alignItems="center" flexDirection="row" gap={spacing.$12}>
      <Image source={{ uri: avatar }} style={{ height: 32, width: 32 }} />
      <View flex={1}>
        <Text title={name} variant="small" />
        <Text title={email} variant="muted" />
      </View>
      <Text title={roles.find((role) => role.id === roleId)?.name || ''} variant="xsmall" />
    </View>
  );
};

type Member = {
  avatar: string;
  email: string;
  id: string;
  name: string;
  roleId: string;
};

type Role = {
  description: string;
  id: string;
  name: string;
};

export const CardTeamMembers = () => {
  const teamMembers: Member[] = useMemo(
    () => [
      {
        avatar: 'https://ui.shadcn.com/avatars/01.png',
        email: 'm@example.com',
        id: '1',
        name: 'Sofia Davis',
        roleId: '4',
      },
      {
        avatar: 'https://ui.shadcn.com/avatars/02.png',
        email: 'p@example.com',
        id: '2',
        name: 'Jackson Lee',
        roleId: '1',
      },
      {
        avatar: 'https://ui.shadcn.com/avatars/03.png',
        email: 'i@example.com',
        id: '3',
        name: 'Isabella Nguyen',
        roleId: '1',
      },
    ],
    []
  );

  return (
    <Card>
      <Text title="Team Members" variant="h3" />
      <Text title="Invite your team members to collaborate" variant="muted" />
      {teamMembers.map(({ avatar, email, id, name, roleId }) => (
        <TeamMember avatar={avatar} email={email} key={id} name={name} roleId={roleId} />
      ))}
    </Card>
  );
};
