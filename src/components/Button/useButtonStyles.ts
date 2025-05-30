import { ButtonVariant } from '~/components/Button/types';
import { ColorName, useAppTheme } from '~/theme/useAppTheme';
import { Typescript } from '~/utils/Typescript';

type ButtonStyles = {
  color: ColorName;
  backgroundColor: string;
  borderColor: string;
};

export const useButtonStyles = (variant: ButtonVariant): ButtonStyles => {
  const { colors } = useAppTheme();

  switch (variant) {
    case 'primary':
      return {
        color: 'primaryForeground',
        backgroundColor: colors.primary,
        borderColor: colors.accent,
      };
    case 'secondary':
      return {
        color: 'foreground',
        backgroundColor: colors.background,
        borderColor: colors.background,
      };
    case 'destructive':
      return {
        color: 'primaryForeground',
        backgroundColor: colors.destructive,
        borderColor: colors.destructive,
      };
    case 'outline':
      return {
        color: 'foreground',
        backgroundColor: colors.transparent,
        borderColor: colors.border,
      };
    case 'ghost':
      return {
        color: 'foreground',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      };
    case 'link':
      return {
        color: 'foreground',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
      };
    default:
      return Typescript.assertNever(variant);
  }
};
