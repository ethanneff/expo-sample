import { Modal as RNModal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Properties = {
  readonly children: React.ReactNode;
  readonly onBackdropPress?: () => void;
};

export const Modal = ({ children, onBackdropPress }: Properties) => {
  const { colors, spacing } = useAppTheme();

  return (
    <RNModal style={{ ...StyleSheet.absoluteFillObject }} transparent>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View absoluteFillObject backgroundColor={colors.foreground} opacity={0.5} />
      </TouchableWithoutFeedback>
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          padding: spacing.$16,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View
          alignSelf="center"
          backgroundColor={colors.background}
          borderColor={colors.border}
          borderRadius={spacing.$8}
          borderWidth={1}
          dropShadow
          padding={spacing.$8}>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </RNModal>
  );
};
