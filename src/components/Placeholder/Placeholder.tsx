import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export const Placeholder = ({ title, children }: Props) => {
  return (
    <Screen>
      <Text title={title} variant="large" textAlign="center" />
      {children}
    </Screen>
  );
};
