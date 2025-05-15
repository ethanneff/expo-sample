import { useCallback, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import {
  runOnJS,
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { spacing } from '~/theme/spacing';
import { useAppTheme } from '~/theme/useAppTheme';
import { AgendaView } from './components/AgendaView';
import { MonthView } from './components/MonthView';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100; // Threshold for vertical swipe

type Props = {
  onDateSelected?: (date: Date) => void;
};

export const Calendar = ({ onDateSelected }: Props) => {
  const { colors } = useAppTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Shared values for animation
  const translateY = useSharedValue(0);

  // Update the selected date and notify parent if needed
  const handleDateSelected = useCallback(
    (date: Date) => {
      setSelectedDate(date);
      onDateSelected?.(date);

      // Also update the current month if the selected date is in a different month
      if (
        date.getMonth() !== currentMonth.getMonth() ||
        date.getFullYear() !== currentMonth.getFullYear()
      ) {
        const newMonth = new Date(date);
        newMonth.setDate(1); // Set to first day of month
        setCurrentMonth(newMonth);
      }
    },
    [onDateSelected, currentMonth]
  );

  // Previous month
  const gotoPrevMonth = useCallback(() => {
    const prevMonth = new Date(currentMonth);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentMonth(prevMonth);
  }, [currentMonth]);

  // Next month
  const gotoNextMonth = useCallback(() => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  }, [currentMonth]);

  // Gesture handler for swiping between months vertically
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const shouldNavigate =
        Math.abs(event.velocityY) > 20 || Math.abs(event.translationY) > SWIPE_THRESHOLD;

      if (shouldNavigate) {
        if (event.velocityY > 0) {
          // Swipe down (previous month)
          translateY.value = withSpring(SCREEN_HEIGHT * 0.2, { damping: 15 });
          runOnJS(gotoPrevMonth)();
        } else {
          // Swipe up (next month)
          translateY.value = withSpring(-SCREEN_HEIGHT * 0.2, { damping: 15 });
          runOnJS(gotoNextMonth)();
        }
      } else {
        // Return to original position if not swiped enough
        translateY.value = withSpring(0);
      }
    },
  });

  // Reset animation when month changes
  useEffect(() => {
    translateY.value = 0;
  }, [currentMonth, translateY]);

  return (
    <View gap={spacing.$12} flex={1}>
      <Card>
        <View gap={spacing.$8}>
          <Text
            title={currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            weight="semibold"
            size="lg"
          />
          <MonthView
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateSelected={handleDateSelected}
          />
        </View>
      </Card>
      <Card style={{ flex: 1, padding: 0 }}>
        <AgendaView selectedDate={selectedDate} onDateChange={handleDateSelected} />
      </Card>
    </View>
  );
};
