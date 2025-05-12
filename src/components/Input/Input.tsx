import { FontAwesome6 } from '@expo/vector-icons';
import { useCallback, useState } from 'react';
import { TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type RequiredTextInputProperties = Required<
  Pick<
    TextInputProps,
    | 'autoCapitalize'
    | 'autoComplete'
    | 'autoCorrect'
    | 'defaultValue'
    | 'editable'
    | 'keyboardType'
    | 'onChangeText'
    | 'onSubmitEditing'
    | 'placeholder'
    | 'returnKeyType'
    | 'submitBehavior'
    | 'textContentType'
  >
>;

type Properties = RequiredTextInputProperties &
  TextInputProps & {
    label: string;
    error?: string;
    readonly ref?: React.RefObject<TextInput>;
  };

const getIcon = (
  hasValue: boolean,
  secureTextEntry: boolean | undefined
): 'times-circle' | 'eye-slash' | 'eye' => {
  if (!hasValue) return 'times-circle';
  if (secureTextEntry === undefined) return 'times-circle';
  if (secureTextEntry) return 'eye';
  return 'eye-slash';
};

const iconSize = 16;

export const Input = ({
  autoCapitalize,
  autoComplete,
  autoCorrect,
  defaultValue = '',
  editable,
  keyboardType,
  onChangeText,
  onSubmitEditing,
  placeholder,
  label,
  error = '',
  ref,
  returnKeyType,
  secureTextEntry,
  style,
  submitBehavior,
  textContentType,
}: Properties) => {
  const [value, setValue] = useState(defaultValue);
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(secureTextEntry);
  const { spacing, colors } = useAppTheme();

  const handleChangeText = useCallback(
    (text: string) => {
      setValue(text);
      onChangeText?.(text);
    },
    [onChangeText]
  );

  const handleIconPress = useCallback(() => {
    if (secureTextEntry !== undefined) {
      setIsSecureTextEntry(!isSecureTextEntry);
      return;
    }
    setValue('');
    onChangeText?.('');
  }, [onChangeText, secureTextEntry, isSecureTextEntry]);

  const showIcon = value.length > 0;
  const icon = getIcon(showIcon, isSecureTextEntry);

  return (
    <View>
      <Text title={label} size="sm" weight="medium" />
      <View marginTop={spacing.$4}>
        <TextInput
          value={value}
          autoCapitalize={autoCapitalize}
          autoComplete={autoComplete}
          autoCorrect={autoCorrect}
          editable={editable}
          placeholderTextColor={colors.mutedForeground}
          keyboardType={keyboardType}
          onChangeText={handleChangeText}
          onSubmitEditing={onSubmitEditing}
          placeholder={placeholder}
          ref={ref}
          cursorColor={colors.primary}
          selectionColor={colors.primary}
          returnKeyType={returnKeyType}
          secureTextEntry={isSecureTextEntry}
          style={[
            {
              padding: spacing.$8,
              borderRadius: spacing.$8,
              borderColor: error ? colors.destructive : colors.border,
              borderWidth: 1,
              paddingRight: showIcon ? iconSize + 2 * spacing.$8 : spacing.$8,
            },
            style,
          ]}
          submitBehavior={submitBehavior}
          textContentType={textContentType}
        />
        {showIcon ? (
          <View position="absolute" top={0} bottom={0} right={spacing.$8} justifyContent="center">
            <TouchableOpacity onPress={handleIconPress}>
              <FontAwesome6 name={icon} size={iconSize} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      {/* <Text title={error} size="xs" color="destructive" /> */}
    </View>
  );
};
