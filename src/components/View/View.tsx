import { type ReactNode } from 'react';
import {
  type LayoutChangeEvent,
  // eslint-disable-next-line no-restricted-imports
  View as RNView,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

type ViewProperties = ViewStyle & {
  readonly absoluteFillObject?: boolean;
  readonly accessibilityLabel?: string;
  readonly accessible?: boolean;
  readonly children?: ReactNode;
  readonly dropShadow?: boolean;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
  readonly safeArea?: boolean;
  readonly safeAreaEdges?: ['top', 'right', 'bottom', 'left'];
  readonly style?: StyleProp<ViewStyle>;
};

const getDropShadow = (dropShadow?: boolean) => {
  if (!dropShadow) return {};
  return {
    elevation: 1,
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  };
};

export const View = ({
  absoluteFillObject,
  accessibilityLabel,
  accessible,
  children,
  dropShadow,
  onLayout,
  style,
  ...rest
}: ViewProperties) => {
  const viewDropShadow = getDropShadow(dropShadow);
  const absolute = absoluteFillObject ? StyleSheet.absoluteFillObject : {};
  const styles = StyleSheet.create({
    view: { ...absolute, ...viewDropShadow, ...rest },
  });

  return (
    <RNView
      accessibilityLabel={accessibilityLabel}
      accessible={accessible}
      onLayout={onLayout}
      style={[styles.view, style]}>
      {children}
    </RNView>
  );
};
