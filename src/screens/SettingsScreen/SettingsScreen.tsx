import { Screen } from '~/components/Screen/Screen';
import { View } from '~/components/View/View';
import { AgendaView } from '~/screens/SettingsScreen/AgendaView';
import { MonthView } from '~/screens/SettingsScreen/MonthView';
import { useAppTheme } from '~/theme/useAppTheme';

const SettingsScreen = () => {
  const { spacing } = useAppTheme();

  return (
    <Screen>
      <View flex={1} padding={spacing.$16} gap={spacing.$16}>
        <MonthView />
        <AgendaView />
      </View>
    </Screen>
  );
};

export default SettingsScreen;
