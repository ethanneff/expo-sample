import React, {
  Children,
  createContext,
  isValidElement,
  type ReactElement,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Divider } from '~/components/Divider/Divider';
import { Icon } from '~/components/Icon/Icon';
import { Pressable } from '~/components/Pressable/Pressable';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useAppTheme } from '~/theme/useAppTheme';

type AccordionContextType = {
  activeItem: null | string;
  setActiveItem: (value: null | string) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

type AccordionItemProperties = {
  readonly children: React.ReactNode;
  readonly collapsible?: boolean;
  readonly isLast?: boolean;
  readonly title: string;
  readonly value: string;
};

export const AccordionItem = ({
  children,
  collapsible = true,
  isLast = false,
  title,
  value,
}: AccordionItemProperties) => {
  const { spacing } = useAppTheme();
  const context = use(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const { activeItem, setActiveItem } = context;
  const isActive = activeItem === value;
  const animation = useSharedValue(isActive ? 1 : 0);

  useEffect(() => {
    animation.value = withSpring(isActive ? 1 : 0, {
      damping: 15,
      mass: 0.5,
      stiffness: 150,
    });
  }, [isActive, animation]);

  const toggleAccordion = useCallback(() => {
    if (isActive && !collapsible) return;
    setActiveItem(isActive ? null : value);
  }, [isActive, collapsible, value, setActiveItem]);

  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${animation.value * 180}deg` }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    maxHeight: animation.value * 1000,
    opacity: animation.value,
  }));

  return (
    <View>
      <Pressable onPress={toggleAccordion}>
        <View
          alignItems="center"
          flexDirection="row"
          justifyContent="space-between"
          padding={spacing.$12}>
          <View flex={1}>
            <Text title={title} variant="large" />
          </View>
          <Animated.View style={chevronStyle}>
            <Icon color="black" name="chevron-down" size={20} />
          </Animated.View>
        </View>
      </Pressable>
      <Animated.View style={contentStyle}>
        <View gap={spacing.$12} padding={spacing.$12} paddingTop={spacing.$4}>
          {children}
        </View>
      </Animated.View>
      {!isLast && <Divider />}
    </View>
  );
};

type AccordionProperties = {
  readonly children: React.ReactNode;
  readonly defaultValue?: string;
};

// eslint-disable-next-line react/no-multi-comp
export const Accordion = ({ children, defaultValue }: AccordionProperties) => {
  const [activeItem, setActiveItem] = useState<null | string>(defaultValue ?? null);
  const value = useMemo(() => ({ activeItem, setActiveItem }), [activeItem, setActiveItem]);

  const childrenArray = Children.toArray(children);
  const lastIndex = childrenArray.length - 1;

  const enhancedChildren = Children.map(children, (child, index) => {
    if (isValidElement(child) && child.type === AccordionItem) {
      return React.cloneElement(child as ReactElement<AccordionItemProperties>, {
        isLast: index === lastIndex,
      });
    }
    return child;
  });

  return (
    <AccordionContext value={value}>
      <View>{enhancedChildren}</View>
    </AccordionContext>
  );
};
