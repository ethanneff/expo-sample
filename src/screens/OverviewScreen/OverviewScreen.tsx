import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Screen } from '~/components/Screen/Screen';
import { CardButtons } from '~/screens/OverviewScreen/CardButtons';
import { CardCalendar } from '~/screens/OverviewScreen/CardCalendar';
import { CardChat } from '~/screens/OverviewScreen/CardChat';
import { CardCreateAccount } from '~/screens/OverviewScreen/CardCreateAccount';
import { CardPayment } from '~/screens/OverviewScreen/CardPayment';
import { CardRevenue } from '~/screens/OverviewScreen/CardRevenue';
import { CardSettings } from '~/screens/OverviewScreen/CardSettings';
import { CardSubscriptions } from '~/screens/OverviewScreen/CardSubscriptions';
import { CardTeamMembers } from '~/screens/OverviewScreen/CardTeamMembers';
import { CardTypography } from '~/screens/OverviewScreen/CardTypography';
import { useAppTheme } from '~/theme/useAppTheme';

const OverviewScreen = () => {
  const { spacing } = useAppTheme();

  return (
    <Screen>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          padding: spacing.$12,
          gap: spacing.$12,
        }}>
        <CardRevenue />
        <CardSubscriptions />
        <CardCalendar initialTimestamp={new Date().getTime()} />
        <CardTeamMembers />
        <CardChat />
        <CardTypography />
        <CardButtons />
        <CardCreateAccount />
        <CardPayment />
        <CardSettings />
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default OverviewScreen;
