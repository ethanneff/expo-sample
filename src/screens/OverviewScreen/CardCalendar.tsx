import memoize from 'lodash/memoize';
import { create } from 'zustand';
import { Button } from '~/components/Button/Button';
import { Card } from '~/components/Card/Card';
import { Pressable } from '~/components/Pressable/Pressable';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { isSameDay } from '~/screens/SettingsScreen/calendarUtils';
import { useAppTheme } from '~/theme/useAppTheme';

const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

type CalendarStore = {
  currentMonth: number;
  startDate: number | null;
  endDate: number | null;
  actions: {
    setCurrentMonth: (timestamp: number) => void;
    handlePrevMonth: () => void;
    handleNextMonth: () => void;
    handleDayPress: (timestamp: number) => void;
    resetToCurrentMonth: () => void;
  };
};

const normalizeToMidnight = (timestamp: number): number => {
  const date = new Date(timestamp);
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  currentMonth: normalizeToMidnight(new Date().getTime()),
  startDate: null,
  endDate: null,
  actions: {
    setCurrentMonth: (timestamp) => set({ currentMonth: normalizeToMidnight(timestamp) }),
    handlePrevMonth: () =>
      set((state) => {
        const date = new Date(state.currentMonth);
        date.setMonth(date.getMonth() - 1);
        return { currentMonth: normalizeToMidnight(date.getTime()) };
      }),
    handleNextMonth: () =>
      set((state) => {
        const date = new Date(state.currentMonth);
        date.setMonth(date.getMonth() + 1);
        return { currentMonth: normalizeToMidnight(date.getTime()) };
      }),
    handleDayPress: (timestamp) =>
      set((state) => {
        const normalizedTimestamp = normalizeToMidnight(timestamp);
        if (!state.startDate || (state.startDate && state.endDate)) {
          return { startDate: normalizedTimestamp, endDate: null };
        } else {
          if (normalizedTimestamp < state.startDate) {
            return { endDate: state.startDate, startDate: normalizedTimestamp };
          } else {
            return { endDate: normalizedTimestamp };
          }
        }
      }),
    resetToCurrentMonth: () => set({ currentMonth: normalizeToMidnight(new Date().getTime()) }),
  },
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
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

    for (let i = 0; i < dayOfWeek; i++) {
      const day = daysInPrevMonth - dayOfWeek + i + 1;
      days.push(new Date(prevYear, prevMonth, day).getTime());
    }

    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i).getTime());
    }

    // Add days from next month to complete the grid
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    const totalDays = days.length;
    const remainingDays = Math.ceil(totalDays / 7) * 7 - totalDays;

    for (let i = 1; i <= remainingDays; i++) {
      days.push(new Date(nextYear, nextMonth, i).getTime());
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

  return (
    <View
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginBottom={spacing.$4}>
      <Button title="" icon="chevron-back" onPress={actions.handlePrevMonth} variant="outline" />
      <Pressable onPress={() => actions.setCurrentMonth(new Date().getTime())}>
        <Text
          title={new Date(currentMonth).toLocaleString('default', {
            month: 'long',
            year: 'numeric',
          })}
          size="md"
          weight="medium"
        />
      </Pressable>
      <Button title="" icon="chevron-forward" onPress={actions.handleNextMonth} variant="outline" />
    </View>
  );
};

const CalendarWeekHeader = () => {
  const { spacing } = useAppTheme();
  return (
    <View flexDirection="row" justifyContent="space-between" paddingVertical={spacing.$8}>
      {days.map((day) => (
        <View key={day} justifyContent="center" alignItems="center" width={`${100 / 7}%`}>
          <Text title={day} size="sm" color="mutedForeground" />
        </View>
      ))}
    </View>
  );
};

type CalendarDayProps = {
  timestamp: number;
};

const CalendarDay = ({ timestamp }: CalendarDayProps) => {
  const { startDate, endDate, actions, currentMonth } = useCalendarStore();
  const { spacing, colors } = useAppTheme();
  const date = new Date(timestamp);
  const isCurrentMonth = date.getUTCMonth() === new Date(currentMonth).getUTCMonth();
  const isToday = isSameDay(date, new Date());
  const isStartDate = startDate && isSameDay(date, new Date(startDate));
  const isEndDate = endDate && isSameDay(date, new Date(endDate));
  const isInRange =
    startDate && endDate && isDateInRange(date, new Date(startDate), new Date(endDate));

  return (
    <Pressable
      onPress={() => actions.handleDayPress(timestamp)}
      style={{
        width: `${100 / 7}%`,
      }}>
      <View
        style={{
          aspectRatio: 1.25,
          justifyContent: 'center',
          borderRadius: spacing.$8,
          alignItems: 'center',
          backgroundColor:
            isStartDate || isEndDate
              ? colors.primary
              : isInRange
                ? colors.secondary
                : 'transparent',
          borderWidth: 1.2,
          borderColor: isToday && !isStartDate && !isEndDate ? colors.primary : 'transparent',
        }}>
        <Text
          title={date.getUTCDate().toString()}
          color={
            isStartDate || isEndDate
              ? 'background'
              : !isCurrentMonth
                ? 'mutedForeground'
                : isInRange
                  ? 'primary'
                  : 'foreground'
          }
          size="sm"
        />
      </View>
    </Pressable>
  );
};

const CalendarDays = () => {
  const { currentMonth } = useCalendarStore();
  const monthDays = getMonthData(currentMonth);
  return (
    <View flexDirection="row" flexWrap="wrap">
      {monthDays.map((timestamp, index) => (
        <CalendarDay key={index} timestamp={timestamp} />
      ))}
    </View>
  );
};

export const CardCalendar = () => {
  const { spacing } = useAppTheme();

  return (
    <Card>
      <View padding={spacing.$4}>
        <CalendarHeader />
        <CalendarWeekHeader />
        <CalendarDays />
      </View>
    </Card>
  );
};
