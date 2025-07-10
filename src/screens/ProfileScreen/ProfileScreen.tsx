import { Icon } from '~/components/Icon/Icon';
import { Screen } from '~/components/Screen/Screen';
import { ScrollView } from '~/components/ScrollView/ScrollView';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { Section } from '~/screens/ProfileScreen/Section';
import { ToggleButton } from '~/screens/ProfileScreen/ToggleButton';
import { useAppTheme } from '~/theme/useAppTheme';

const noop = () => false;

const ProfileScreen = () => {
  const { borderRadius, colors, spacing } = useAppTheme();
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          gap: spacing.$12,
          padding: spacing.$12,
        }}
        style={{
          backgroundColor: colors.card,
          paddingTop: spacing.$20,
        }}>
        <Text color="chart1" textAlign="center" title="Daily Quest update!" variant="h1" />
        <View borderColor={colors.border} borderRadius={borderRadius.$16} borderWidth={spacing.$2}>
          <Section current={2} icon="airplane" title="Complete 2 lessons" total={2} />
          <View backgroundColor={colors.border} height={spacing.$1} />
          <Section current={2} icon="book" title="Score 80% or higher in 4 lessons" total={4} />
          <View backgroundColor={colors.border} height={spacing.$1} />
          <Section
            current={0}
            icon="baseball"
            title="Get 5 in a row correct in 5 lessons"
            total={5}
          />
        </View>
        <View
          borderColor={colors.border}
          borderRadius={borderRadius.$16}
          borderWidth={spacing.$2}
          flexDirection="row"
          gap={spacing.$12}
          justifyContent="space-between"
          padding={spacing.$16}>
          <View flexShrink={1} gap={spacing.$8}>
            <Text title="Eddy's Epic Summer" variant="lead" />
            <Text color="chart1" fontFamily="Geist-SemiBold" title="19 / 50" variant="lead" />
          </View>
          <View justifyContent="center">
            <Icon color={colors.chart1} name="star" size={spacing.$44} />
          </View>
        </View>
      </ScrollView>
      <View backgroundColor={colors.card} padding={spacing.$12}>
        <ToggleButton onPress={noop} title="Continue" />
      </View>
    </Screen>
  );
};

export default ProfileScreen;
