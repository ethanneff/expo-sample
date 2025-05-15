import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  FadeIn,
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { spacing } from '~/theme/spacing';
import { useAppTheme } from '~/theme/useAppTheme';
import { hasEvents, isSameDay } from '../utils/events';

type MonthViewProps = {
  currentMonth: Date;
  selectedDate: Date;
  onDateSelected: (date: Date) => void;
};

// Get day names for header (Su, Mo, Tu, etc.)
const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const ROW_HEIGHT = 40; // Height of a week row
const DEFAULT_COLLAPSED_ROWS = 1; // Show 1 row when collapsed (current week)
const MAX_ROWS = 6; // Maximum of 6 weeks in a month view

export const MonthView = ({ currentMonth, selectedDate, onDateSelected }: MonthViewProps) => {
  const { colors, borderRadius } = useAppTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  // Shared values for expansion animation
  const expandProgress = useSharedValue(0); // 0 = collapsed, 1 = expanded

  // Check if a date is in the current month
  const isCurrentMonth = useCallback(
    (date: Date) => {
      return date.getMonth() === currentMonth.getMonth();
    },
    [currentMonth]
  );

  // Check if a date is today
  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return isSameDay(date, today);
  }, []);

  // Generate calendar days for the month
  const calendarDays = useMemo(() => {
    // Get the first day of the month
    const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get the last day of the month
    const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();

    // Get days from previous month to fill first week
    const days: Date[] = [];

    // Add days from previous month
    if (firstDayOfWeek > 0) {
      const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0);
      const prevMonthDays = prevMonth.getDate();

      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = new Date(prevMonth);
        day.setDate(prevMonthDays - i);
        days.push(day);
      }
    }

    // Add days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
      days.push(day);
    }

    // Add days from next month to fill last week (total of 42 days = 6 weeks)
    const remainingDays = 42 - days.length;
    if (remainingDays > 0) {
      const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);

      for (let i = 1; i <= remainingDays; i++) {
        const day = new Date(nextMonth);
        day.setDate(i);
        days.push(day);
      }
    }

    return days;
  }, [currentMonth]);

  // Determine which week contains today or selected date to show in collapsed mode
  const currentWeekIndex = useMemo(() => {
    // If the selected date is in current month, show its week
    if (isCurrentMonth(selectedDate)) {
      // Find which week contains the selected date
      for (let i = 0; i < MAX_ROWS; i++) {
        const weekStartIndex = i * 7;
        const weekEndIndex = weekStartIndex + 6;

        if (weekStartIndex >= calendarDays.length) break;

        for (let j = weekStartIndex; j <= weekEndIndex; j++) {
          if (j >= calendarDays.length) break;
          if (isSameDay(calendarDays[j], selectedDate)) {
            return i;
          }
        }
      }
    }

    // If selected date not in current month or not found, show today's week if in current month
    const today = new Date();
    if (today.getMonth() === currentMonth.getMonth()) {
      for (let i = 0; i < MAX_ROWS; i++) {
        const weekStartIndex = i * 7;
        const weekEndIndex = weekStartIndex + 6;

        if (weekStartIndex >= calendarDays.length) break;

        for (let j = weekStartIndex; j <= weekEndIndex; j++) {
          if (j >= calendarDays.length) break;
          if (isToday(calendarDays[j])) {
            return i;
          }
        }
      }
    }

    // Default to first week if neither selected date nor today is in current month
    return 0;
  }, [calendarDays, selectedDate, currentMonth, isCurrentMonth, isToday]);

  // Toggle expanded/collapsed state
  const toggleExpanded = useCallback(() => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    expandProgress.value = withSpring(newState ? 1 : 0, { damping: 15 });
  }, [isExpanded, expandProgress]);

  // Set initial expansion state
  useEffect(() => {
    expandProgress.value = withTiming(0, { duration: 300 });
    setIsExpanded(false);
  }, [expandProgress, currentMonth]);

  // Gesture handler for expanding/collapsing
  const panGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: any) => {
      ctx.startProgress = expandProgress.value;
    },
    onActive: (event, ctx) => {
      // Map vertical drag to expansion progress (negative = drag down to expand)
      const newProgress =
        ctx.startProgress - event.translationY / (ROW_HEIGHT * (MAX_ROWS - DEFAULT_COLLAPSED_ROWS));
      expandProgress.value = Math.max(0, Math.min(1, newProgress));
    },
    onEnd: (event) => {
      // If velocity or progress crosses threshold, expand or collapse fully
      const shouldExpand = event.velocityY < -200 || expandProgress.value > 0.5;
      expandProgress.value = withSpring(shouldExpand ? 1 : 0, { damping: 15 });
      runOnJS(setIsExpanded)(shouldExpand);
    },
  });

  // Calculate the visible height based on expansion progress
  const containerHeight = useDerivedValue(() => {
    const minHeight = (DEFAULT_COLLAPSED_ROWS + 1) * ROW_HEIGHT; // +1 for the header row
    const maxHeight = (MAX_ROWS + 1) * ROW_HEIGHT; // +1 for the header row
    return interpolate(expandProgress.value, [0, 1], [minHeight, maxHeight], Extrapolation.CLAMP);
  });

  // Animated styles for the container height
  const containerStyle = useAnimatedStyle(() => {
    return {
      height: containerHeight.value,
      overflow: 'hidden',
    };
  });

  // Calculate visible weeks based on current week and expansion state
  const visibleWeeks = useMemo(() => {
    const weeks = [];
    const totalWeeks = Math.ceil(calendarDays.length / 7);

    // In collapsed mode, show only the current week
    if (!isExpanded) {
      const start = currentWeekIndex * 7;
      const end = Math.min(start + 6, calendarDays.length - 1);
      weeks.push(calendarDays.slice(start, end + 1));
      return weeks;
    }

    // In expanded mode, show all weeks
    for (let i = 0; i < totalWeeks; i++) {
      const start = i * 7;
      const end = Math.min(start + 6, calendarDays.length - 1);
      weeks.push(calendarDays.slice(start, end + 1));
    }

    return weeks;
  }, [calendarDays, isExpanded, currentWeekIndex]);

  return (
    <View>
      {/* Gesture handler for expanding/collapsing */}
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <Animated.View style={containerStyle}>
          {/* Weekday header */}
          <View flexDirection="row" justifyContent="space-between" marginBottom={spacing.$4}>
            {WEEKDAYS.map((weekday) => (
              <View key={weekday} width={32} alignItems="center">
                <Text title={weekday} size="sm" color="mutedForeground" weight="medium" />
              </View>
            ))}
          </View>

          {/* Calendar grid - show either all weeks or just current week */}
          <Animated.View entering={FadeIn.duration(300)}>
            {isExpanded ? (
              // Expanded view - show all weeks
              <View>
                {visibleWeeks.map((week, weekIndex) => (
                  <View key={weekIndex} flexDirection="row" style={styles.weekRow}>
                    {week.map((date, dateIndex) => renderDay(date, weekIndex * 7 + dateIndex))}
                  </View>
                ))}
              </View>
            ) : (
              // Collapsed view - show only current week
              <View>
                {visibleWeeks.map((week, weekIndex) => (
                  <View key={weekIndex} flexDirection="row" style={styles.weekRow}>
                    {week.map((date, dateIndex) => renderDay(date, weekIndex * 7 + dateIndex))}
                  </View>
                ))}
              </View>
            )}
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>

      {/* Expansion indicator */}
      <View alignItems="center" marginTop={spacing.$2}>
        <Pressable onPress={toggleExpanded} hitSlop={10}>
          <View width={40} height={4} backgroundColor={colors.border} borderRadius={2} />
        </Pressable>
      </View>
    </View>
  );

  // Helper function to render a single day cell
  function renderDay(date: Date, index: number) {
    const isSelected = isSameDay(date, selectedDate);
    const isThisMonth = isCurrentMonth(date);
    const today = isToday(date);
    const dateHasEvents = hasEvents(date);

    return (
      <Pressable key={index} style={styles.dayContainer} onPress={() => onDateSelected(date)}>
        <View
          width={32}
          height={32}
          borderRadius={borderRadius.$24}
          justifyContent="center"
          alignItems="center"
          backgroundColor={isSelected ? colors.primary : undefined}
          borderWidth={today && !isSelected ? 1.5 : 0}
          borderColor={today && !isSelected ? colors.primary : undefined}>
          <Text
            title={date.getDate().toString()}
            size="sm"
            weight={isSelected || today ? 'semibold' : 'regular'}
            color={
              isSelected
                ? 'primaryForeground'
                : isThisMonth
                  ? today
                    ? 'primary'
                    : 'foreground'
                  : 'mutedForeground'
            }
          />

          {/* Event indicator dot */}
          {dateHasEvents && !isSelected && (
            <View
              style={styles.eventDot}
              backgroundColor={colors.accent}
              borderRadius={4}
              width={4}
              height={4}
            />
          )}
        </View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  dayContainer: {
    width: '14.28%',
    alignItems: 'center',
    padding: 2,
  },
  eventDot: {
    position: 'absolute',
    bottom: 2,
  },
  weekRow: {
    flexDirection: 'row',
    marginBottom: 4,
    height: ROW_HEIGHT - 4,
  },
});
