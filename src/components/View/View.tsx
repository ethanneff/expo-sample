import { type ReactNode } from 'react';
import {
  type LayoutChangeEvent,
  View as RNView,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native';
import { ColorName } from '~/theme/colors';
import { useAppTheme } from '~/theme/useAppTheme';

type ViewProperties = ViewStyle & {
  readonly absoluteFillObject?: boolean;
  readonly accessible?: boolean;
  readonly children?: ReactNode;
  readonly dropShadowColor?: ColorName;
  readonly onLayout?: (event: LayoutChangeEvent) => void;
  readonly safeArea?: boolean;
  readonly safeAreaEdges?: ['top', 'right', 'bottom', 'left'];
  readonly style?: StyleProp<ViewStyle>;
};

const useDropShadow = (dropShadowThemeColor: ColorName) => {
  const { colors } = useAppTheme();
  if (dropShadowThemeColor === 'transparent') return {};
  return {
    backgroundColor: colors[dropShadowThemeColor],
    elevation: 2,
    shadowColor: colors.foreground,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  };
};

export const View = ({
  absoluteFillObject,
  accessible,
  children,
  dropShadowColor = 'transparent',
  onLayout,
  safeArea,
  safeAreaEdges,
  style,
  ...rest
}: ViewProperties) => {
  const dropShadow = useDropShadow(dropShadowColor);
  const absolute = absoluteFillObject ? StyleSheet.absoluteFillObject : {};
  const styles = StyleSheet.create({
    view: { ...absolute, ...dropShadow, ...rest },
  });

  return (
    <RNView accessible={accessible} onLayout={onLayout} style={[styles.view, style]}>
      {children}
    </RNView>
  );
};
