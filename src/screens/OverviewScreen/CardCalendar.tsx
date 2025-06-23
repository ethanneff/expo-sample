import memoize from 'lodash/memoize';
import { useCallback } from 'react';
import { create } from 'zustand';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Pressable } from '~/components/Pressable/Pressable';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { isSameDay } from '~/screens/SettingsScreen/calendarUtilities';
import { useAppTheme } from '~/theme/useAppTheme';

const dayAbbreviations = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type CalendarStore = {
  actions: {
    handleDayPress: (timestamp: number) => void;
    handleNextMonth: () => void;
    handlePrevMonth: () => void;
    resetToCurrentMonth: () => void;
    setCurrentMonth: (timestamp: number) => void;
  };
  currentMonth: number;
  endDate: null | number;
  startDate: null | number;
};

const normalizeToMidnight = (timestamp: number): number => {
  const date = new Date(timestamp);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

const useCalendarStore = create<CalendarStore>((set) => ({
  actions: {
    handleDayPress: (timestamp) => {
      set((state) => {
        const normalizedTimestamp = normalizeToMidnight(timestamp);
        if (!state.startDate || (state.startDate && state.endDate)) {
          return { endDate: null, startDate: normalizedTimestamp };
        }
        if (normalizedTimestamp < state.startDate) {
          return { endDate: state.startDate, startDate: normalizedTimestamp };
        }
        return { endDate: normalizedTimestamp };
      });
    },
    handleNextMonth: () => {
      set((state) => {
        const date = new Date(state.currentMonth);
        date.setMonth(date.getMonth() + 1);
        return { currentMonth: normalizeToMidnight(date.getTime()) };
      });
    },
    handlePrevMonth: () => {
      set((state) => {
        const date = new Date(state.currentMonth);
        date.setMonth(date.getMonth() - 1);
        return { currentMonth: normalizeToMidnight(date.getTime()) };
      });
    },
    resetToCurrentMonth: () => {
      set({ currentMonth: normalizeToMidnight(Date.now()) });
    },
    setCurrentMonth: (timestamp) => {
      set({ currentMonth: normalizeToMidnight(timestamp) });
    },
  },
  currentMonth: normalizeToMidnight(Date.now()),
  endDate: null,
  startDate: null,
}));

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthData = memoize(
  (timestamp: number) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = getDaysInMonth(year, month);
    const dayOfWeek = firstDayOfMonth.getDay();

    // Create array for all days + padding days from previous and next months
    const days: number[] = [];

    // Add days from previous month to fill the first week
    const previousMonth = month === 0 ? 11 : month - 1;
    const previousYear = month === 0 ? year - 1 : year;
    const daysInPreviousMonth = getDaysInMonth(previousYear, previousMonth);

    for (let index = 0; index < dayOfWeek; index += 1) {
      const day = daysInPreviousMonth - dayOfWeek + index + 1;
      days.push(new Date(previousYear, previousMonth, day).getTime());
    }

    // Add days from current month
    for (let index = 1; index <= daysInMonth; index += 1) {
      days.push(new Date(year, month, index).getTime());
    }

    // Add days from next month to complete the grid
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const totalDays = days.length;
    const remainingDays = Math.ceil(totalDays / 7) * 7 - totalDays;

    for (let index = 1; index <= remainingDays; index += 1) {
      days.push(new Date(nextYear, nextMonth, index).getTime());
    }

    return days;
  },
  (timestamp) => timestamp
);

const isDateInRange = (date: Date, startDate: Date, endDate: Date): boolean => {
  return date >= startDate && date <= endDate;
};

const CalendarHeader = () => {
  const { spacing } = useAppTheme();
  const { actions, currentMonth } = useCalendarStore();

  const handleCurrentMonth = useCallback(() => {
    actions.setCurrentMonth(Date.now());
  }, [actions]);

  return (
    <View
      alignItems="center"
      flexDirection="row"
      justifyContent="space-between"
      marginBottom={spacing.$4}>
      <Button icon="chevron-back" onPress={actions.handlePrevMonth} title="" variant="outline" />
      <Pressable onPress={handleCurrentMonth}>
        <Text
          title={new Date(currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
        />
      </Pressable>
      <Button icon="chevron-forward" onPress={actions.handleNextMonth} title="" variant="outline" />
    </View>
  );
};

// eslint-disable-next-line react/no-multi-comp
const CalendarWeekHeader = () => {
  const { spacing } = useAppTheme();
  return (
    <View flexDirection="row" justifyContent="space-between" paddingVertical={spacing.$8}>
      {dayAbbreviations.map((dayAbbreviation) => (
        <View
          alignItems="center"
          justifyContent="center"
          key={dayAbbreviation}
          width={`${100 / 7}%`}>
          <Text title={dayAbbreviation} variant="muted" />
        </View>
      ))}
    </View>
  );
};

type CalendarDayProperties = {
  readonly timestamp: number;
};

// eslint-disable-next-line react/no-multi-comp
const CalendarDay = ({ timestamp }: CalendarDayProperties) => {
  const { actions, currentMonth, endDate, startDate } = useCalendarStore();
  const { colors, spacing } = useAppTheme();
  const date = new Date(timestamp);
  const isCurrentMonth = date.getUTCMonth() === new Date(currentMonth).getUTCMonth();
  const isToday = isSameDay(date, new Date());
  const isStartDate = startDate && isSameDay(date, new Date(startDate));
  const isEndDate = endDate && isSameDay(date, new Date(endDate));
  const isInRange =
    startDate && endDate && isDateInRange(date, new Date(startDate), new Date(endDate));

  const getBackgroundColor = () => {
    if (isStartDate || isEndDate) {
      return colors.primary;
    }
    if (isInRange) {
      return colors.secondary;
    }
    return 'transparent';
  };

  const getBorderColor = () => {
    if (isToday && !isStartDate && !isEndDate) {
      return colors.primary;
    }
    return 'transparent';
  };

  const getTextColor = () => {
    if (isStartDate || isEndDate) {
      return 'background';
    }
    if (isCurrentMonth) {
      if (isInRange) {
        return 'primary';
      }
      return 'foreground';
    }
    return 'mutedForeground';
  };

  const handleDayPress = useCallback(() => {
    actions.handleDayPress(timestamp);
  }, [actions, timestamp]);

  return (
    <Pressable
      onPress={handleDayPress}
      style={{
        width: `${100 / 7}%`,
      }}>
      <View
        style={{
          alignItems: 'center',
          aspectRatio: 1.25,
          backgroundColor: getBackgroundColor(),
          borderColor: getBorderColor(),
          borderRadius: spacing.$8,
          borderWidth: 1.2,
          justifyContent: 'center',
        }}>
        <Text color={getTextColor()} title={date.getUTCDate().toString()} variant="small" />
      </View>
    </Pressable>
  );
};

// eslint-disable-next-line react/no-multi-comp
const CalendarDays = () => {
  const { currentMonth } = useCalendarStore();
  const monthDays = getMonthData(currentMonth);
  return (
    <View flexDirection="row" flexWrap="wrap">
      {monthDays.map((timestamp) => (
        <CalendarDay key={timestamp} timestamp={timestamp} />
      ))}
    </View>
  );
};

// eslint-disable-next-line react/no-multi-comp
export const CardCalendar = () => {
  return (
    <Card>
      <CalendarHeader />
      <CalendarWeekHeader />
      <CalendarDays />
    </Card>
  );
};
