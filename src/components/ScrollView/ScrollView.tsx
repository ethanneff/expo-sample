import { type ScrollViewProps } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useAppTheme } from '~/theme/useAppTheme';

export const ScrollView = ({ children, ...rest }: ScrollViewProps) => {
  const { theme } = useAppTheme();
  const indicatorStyle = theme === 'dark' ? 'white' : 'black';

  return (
    <KeyboardAwareScrollView
      indicatorStyle={indicatorStyle}
      keyboardShouldPersistTaps="handled"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}>
      {children}
    </KeyboardAwareScrollView>
  );
};
