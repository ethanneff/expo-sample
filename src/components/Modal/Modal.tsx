import { Modal as RNModal, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type Props = {
  onBackdropPress?: () => void;
  children: React.ReactNode;
};

export const Modal = ({ children, onBackdropPress }: Props) => {
  const { colors, spacing } = useAppTheme();

  return (
    <RNModal style={{ ...StyleSheet.absoluteFillObject }} transparent>
      <TouchableWithoutFeedback onPress={onBackdropPress}>
        <View absoluteFillObject opacity={0.5} backgroundColor={colors.foreground} />
      </TouchableWithoutFeedback>
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View
          alignSelf="center"
          backgroundColor={colors.background}
          borderRadius={spacing.$8}
          dropShadow
          borderWidth={1}
          borderColor={colors.border}
          padding={spacing.$8}>
          {children}
        </View>
      </KeyboardAwareScrollView>
    </RNModal>
  );
};
