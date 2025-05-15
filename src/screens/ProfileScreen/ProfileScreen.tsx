import { Screen } from '~/components/Screen/Screen';
import { View } from '~/components/View/View';
import { Calendar } from '~/screens/ProfileScreen/Calendar/Calendar';
import { spacing } from '~/theme/spacing';

const ProfileScreen = () => {
  return (
    <Screen>
      <View padding={spacing.$12} flex={1}>
        <Calendar />
      </View>
    </Screen>
  );
};

export default ProfileScreen;
