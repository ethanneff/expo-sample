import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';

type Props = {
  title: string;
  children?: React.ReactNode;
};

export const Placeholder = ({ title, children }: Props) => {
  return (
    <Screen>
      <Text
        title={title}
        color="foreground"
        size="lg"
        family="Geist"
        weight="medium"
        align="center"
      />
      {children}
    </Screen>
  );
};
