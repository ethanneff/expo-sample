import React, {
  Children,
  createContext,
  isValidElement,
  ReactElement,
  useContext,
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
  activeItem: string | null;
  setActiveItem: (value: string | null) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

type AccordionItemProps = {
  title: string;
  value: string;
  children: React.ReactNode;
  collapsible?: boolean;
  isLast?: boolean;
};

export const AccordionItem = ({
  title,
  value,
  children,
  collapsible = true,
  isLast = false,
}: AccordionItemProps) => {
  const { spacing } = useAppTheme();
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const { activeItem, setActiveItem } = context;
  const isActive = activeItem === value;
  const animation = useSharedValue(isActive ? 1 : 0);

  React.useEffect(() => {
    animation.value = withSpring(isActive ? 1 : 0, {
      damping: 15,
      stiffness: 150,
      mass: 0.5,
    });
  }, [isActive, animation]);

  const toggleAccordion = () => {
    if (isActive && !collapsible) return;
    setActiveItem(isActive ? null : value);
  };

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
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          padding={spacing.$12}>
          <View flex={1}>
            <Text title={title} weight="medium" />
          </View>
          <Animated.View style={chevronStyle}>
            <Icon name="chevron-down" size={20} color="black" />
          </Animated.View>
        </View>
      </Pressable>
      <Animated.View style={contentStyle}>
        <View padding={spacing.$12} paddingTop={spacing.$4} gap={spacing.$12}>
          {children}
        </View>
      </Animated.View>
      {!isLast && <Divider />}
    </View>
  );
};

type AccordionProps = {
  defaultValue?: string;
  children: React.ReactNode;
};

export const Accordion = ({ defaultValue, children }: AccordionProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(defaultValue || null);
  const value = useMemo(() => ({ activeItem, setActiveItem }), [activeItem, setActiveItem]);

  const childrenArray = Children.toArray(children);
  const lastIndex = childrenArray.length - 1;

  const enhancedChildren = Children.map(children, (child, index) => {
    if (isValidElement(child) && child.type === AccordionItem) {
      return React.cloneElement(child as ReactElement<AccordionItemProps>, {
        isLast: index === lastIndex,
      });
    }
    return child;
  });

  return (
    <AccordionContext.Provider value={value}>
      <View>{enhancedChildren}</View>
    </AccordionContext.Provider>
  );
};
