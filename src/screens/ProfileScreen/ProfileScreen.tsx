import { useCallback, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Icon } from '~/components/Icon/Icon';
import { Paragraph } from '~/components/Paragraph/Paragraph';
import { Pressable } from '~/components/Pressable/Pressable';
import { Screen } from '~/components/Screen/Screen';
import { ScrollView } from '~/components/ScrollView/ScrollView';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { type ColorName, useAppTheme } from '~/theme/useAppTheme';

const noop = () => false;

type Properties = {
  readonly color: ColorName;
  readonly current: number;
  readonly total: number;
};

const ProgressBar = ({ color, current, total }: Properties) => {
  const { borderRadius, colors, spacing } = useAppTheme();
  const percent = (current / total) * 100;
  const styles = StyleSheet.create({
    text: {
      color: colors.primaryForeground,
      textShadowColor: colors.primary,
      textShadowOffset: { height: 0, width: 0 },
      textShadowRadius: 1.5,
    },
  });

  return (
    <View flex={1}>
      <View
        backgroundColor={colors.border}
        borderBlockColor={colors.border}
        borderRadius={borderRadius.$24}>
        <Text accessible={false} title=" " variant="p" />
        <View
          absoluteFillObject
          backgroundColor={colors[color]}
          borderBlockColor={colors.border}
          borderBottomRightRadius={0}
          borderLeftWidth={0}
          borderRadius={borderRadius.$24}
          borderRightWidth={0}
          borderTopRightRadius={0}
          borderWidth={1}
          width={`${percent}%`}>
          <View
            backgroundColor={colors.card}
            borderRadius={borderRadius.$24}
            height={spacing.$4}
            marginHorizontal={spacing.$8}
            marginTop={spacing.$6}
            opacity={0.5}
          />
        </View>
        <View
          absoluteFillObject
          alignItems="center"
          borderRadius={borderRadius.$24}
          justifyContent="center">
          <Paragraph>
            <Text
              fontFamily="Geist-SemiBold"
              style={styles.text}
              title={`${current}`}
              variant="p"
            />
            <Text fontFamily="Geist-SemiBold" style={styles.text} title={` / `} variant="p" />
            <Text fontFamily="Geist-SemiBold" style={styles.text} title={`${total}`} variant="p" />
          </Paragraph>
        </View>
      </View>
    </View>
  );
};

type ToggleButtonProperties = {
  readonly onPress: () => void;
  readonly title: string;
};

// eslint-disable-next-line react/no-multi-comp
const ToggleButton = ({ onPress, title }: ToggleButtonProperties) => {
  const { borderRadius, colors, spacing } = useAppTheme();
  const translateY = useRef(new Animated.Value(-spacing.$8)).current;

  const renderButton = useCallback(
    (buttonTitle: string, accessible: boolean) => {
      return (
        <View
          absoluteFillObject={!accessible}
          backgroundColor={accessible ? colors.chart2 : colors.primary}
          borderRadius={borderRadius.$16}
          padding={spacing.$16}
          paddingHorizontal={spacing.$24}>
          <Text
            accessible={accessible}
            color="primaryForeground"
            fontFamily="Geist-Bold"
            textAlign="center"
            textTransform="uppercase"
            title={buttonTitle}
            variant="lead"
          />
        </View>
      );
    },
    [colors, borderRadius, spacing]
  );

  const handlePressIn = useCallback(() => {
    Animated.timing(translateY, {
      duration: 100,
      toValue: 0,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  const handlePressOut = useCallback(() => {
    Animated.timing(translateY, {
      duration: 100,
      toValue: -spacing.$8,
      useNativeDriver: true,
    }).start();
    onPress();
  }, [translateY, onPress, spacing]);

  return (
    <Pressable activeOpacity={1} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          transform: [{ translateY }],
          zIndex: 1,
        }}>
        {renderButton(title, true)}
      </Animated.View>
      {renderButton(title, false)}
    </Pressable>
  );
};

// eslint-disable-next-line react/no-multi-comp
const ProfileScreen = () => {
  const { borderRadius, colors, spacing } = useAppTheme();
  return (
    <Screen>
      <ScrollView
        contentContainerStyle={{
          // backgroundColor: colors.card,
          gap: spacing.$12,
          padding: spacing.$12,
        }}>
        <Text title="All Daily Quests Complete!" variant="h3" />
        <View
          backgroundColor={colors.card}
          borderColor={colors.border}
          borderRadius={borderRadius.$16}
          borderWidth={spacing.$2}>
          <View gap={spacing.$8} padding={spacing.$16}>
            <Text title="Complete 2 lessons" variant="lead" />
            <View alignItems="center" flexDirection="row" gap={spacing.$8}>
              <ProgressBar color="chart1" current={2} total={5} />
              <Icon name="airplane" size={spacing.$32} />
            </View>
          </View>
          <View backgroundColor={colors.border} height={spacing.$1} />
          <View gap={spacing.$8} padding={spacing.$16}>
            <Text title="Score 80% or higher in 4 lessons" variant="lead" />
            <View alignItems="center" flexDirection="row" gap={spacing.$8}>
              <ProgressBar color="chart1" current={4} total={5} />
              <Icon name="book" size={spacing.$32} />
            </View>
          </View>
          <View backgroundColor={colors.border} height={spacing.$1} />
          <View gap={spacing.$8} padding={spacing.$16}>
            <Text title="Get 5 in a row correct in 5 lessons" variant="lead" />
            <View alignItems="center" flexDirection="row" gap={spacing.$8}>
              <ProgressBar color="chart1" current={55} total={100} />
              <Icon name="baseball" size={spacing.$32} />
            </View>
          </View>
        </View>
        <View
          backgroundColor={colors.card}
          borderColor={colors.border}
          borderRadius={borderRadius.$16}
          borderWidth={spacing.$2}
          flexDirection="row"
          justifyContent="space-between"
          padding={spacing.$16}>
          <View gap={spacing.$8}>
            <Text title="Eddy's Epic Summer" variant="lead" />
            <Text title="19 / 50" variant="lead" />
          </View>
          <View justifyContent="center">
            <Icon name="star" size={spacing.$36} />
          </View>
        </View>
      </ScrollView>
      <ToggleButton onPress={noop} title="Continue" />
    </Screen>
  );
};

export default ProfileScreen;
