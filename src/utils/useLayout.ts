import { useCallback, useState } from 'react';
import { type LayoutChangeEvent, type LayoutRectangle } from 'react-native';

type Properties = {
  threshold?: number;
};

export const useLayout = ({ threshold = 0 }: Properties = {}) => {
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent | null) => {
      if (!event) return;
      const { height, width, x, y } = event.nativeEvent.layout;
      setLayout((previous) => {
        if (!previous) return { height, width, x, y };
        const { height: pHeight, width: pWidth, x: pX, y: pY } = previous;

        const widthChange = pWidth === 0 ? 0 : Math.abs(width - pWidth) / pWidth;
        const heightChange = pHeight === 0 ? 0 : Math.abs(height - pHeight) / pHeight;
        const xChange = pX === 0 ? 0 : Math.abs(x - pX) / pX;
        const yChange = pY === 0 ? 0 : Math.abs(y - pY) / pY;

        if (
          widthChange > threshold ||
          heightChange > threshold ||
          xChange > threshold ||
          yChange > threshold
        ) {
          return { height, width, x, y };
        }
        return previous;
      });
    },
    [threshold]
  );

  return { handleLayout, layout };
};
