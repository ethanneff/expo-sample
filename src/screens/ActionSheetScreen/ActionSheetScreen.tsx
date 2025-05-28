import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { Screen } from '~/components/Screen/Screen';
import { Text } from '~/components/Text/Text';

const DebugScreen = () => (
  <Screen>
    <KeyboardAwareScrollView>
      <Text title="Action Sheet Screen" size="4xl" weight="light" />
      <Text title="Content" />
      <Text title="Content" />
      <Text title="Content" />
    </KeyboardAwareScrollView>
  </Screen>
);

export default DebugScreen;
