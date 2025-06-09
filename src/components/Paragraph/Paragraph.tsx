import { type PropsWithChildren } from 'react';
import { Text as RNText } from 'react-native';

export const Paragraph = ({ children }: PropsWithChildren) => {
  return <RNText>{children}</RNText>;
};
