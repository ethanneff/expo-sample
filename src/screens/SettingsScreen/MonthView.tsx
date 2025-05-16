import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SectionList, SectionListData, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useCalendarStore } from '~/screens/SettingsScreen/useCalendarStore';
import { useAppTheme } from '~/theme/useAppTheme';

// Constants
const MONTHS_TO_LOAD = 10;
const DAYS_IN_WEEK = 7;

// Types for our data structures
interface DayItem {
  date: Date;
  isCurrentMonth: boolean;
  id: string;
}

interface MonthData {
  id: string;
  month: number;
  year: number;
  title: string;
  weeks: DayItem[][];
}

// Helper functions
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const formatDateToId = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

const formatMonthToId = (year: number, month: number): string => {
  return `${year}-${month + 1}`;
};

const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthData = (year: number, month: number): MonthData => {
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = getDaysInMonth(year, month);
  const dayOfWeek = firstDayOfMonth.getDay();

  // Get the month name
  const monthName = firstDayOfMonth.toLocaleString('default', { month: 'long' });

  // Create array for all days + padding days from previous and next months
  const days: DayItem[] = [];

  // Add days from previous month to fill the first week
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;
  const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

  for (let i = 0; i < dayOfWeek; i++) {
    const day = daysInPrevMonth - dayOfWeek + i + 1;
    const date = new Date(prevYear, prevMonth, day);
    days.push({
      date,
      isCurrentMonth: false,
      id: formatDateToId(date),
    });
  }

  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    days.push({
      date,
      isCurrentMonth: true,
      id: formatDateToId(date),
    });
  }

  // Add days from next month to complete the grid
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  const totalDays = days.length;
  const remainingDays = Math.ceil(totalDays / DAYS_IN_WEEK) * DAYS_IN_WEEK - totalDays;

  for (let i = 1; i <= remainingDays; i++) {
    const date = new Date(nextYear, nextMonth, i);
    days.push({
      date,
      isCurrentMonth: false,
      id: formatDateToId(date),
    });
  }

  // Group days into weeks
  const weeks: DayItem[][] = [];
  let week: DayItem[] = [];

  days.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % DAYS_IN_WEEK === 0) {
      weeks.push(week);
      week = [];
    }
  });

  return {
    id: formatMonthToId(year, month),
    month,
    year,
    title: `${monthName} ${year}`,
    weeks,
  };
};

const getMonthsData = (centerDate: Date, count: number): MonthData[] => {
  const months: MonthData[] = [];
  const halfCount = Math.floor(count / 2);

  // Start with months before the current month
  for (let i = -halfCount; i < halfCount + 1; i++) {
    const date = new Date(centerDate);
    date.setMonth(centerDate.getMonth() + i);
    months.push(getMonthData(date.getFullYear(), date.getMonth()));
  }

  return months;
};

// Define the section type for TypeScript
type MonthSection = {
  title: string;
  id: string;
  data: DayItem[][];
};

export const MonthView = () => {
  const { colors, spacing } = useAppTheme();
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const onDayChange = useCalendarStore((state) => state.action.onDayChange);

  const today = new Date();
  const [months, setMonths] = useState<MonthData[]>([]);
  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);
  const [initialScrollComplete, setInitialScrollComplete] = useState(false);
  const listRef = useRef<SectionList<DayItem[], MonthSection>>(null);

  // Initialize months centered on the selected date
  useEffect(() => {
    if (months.length === 0) {
      const monthsData = getMonthsData(selectedDate, MONTHS_TO_LOAD);
      setMonths(monthsData);
    }
  }, [selectedDate, months.length]);

  // Find the index of the month containing the selected date
  const getSelectedMonthIndex = useCallback(() => {
    if (months.length === 0) return -1;

    const monthId = formatMonthToId(selectedDate.getFullYear(), selectedDate.getMonth());
    return months.findIndex((month) => month.id === monthId);
  }, [months, selectedDate]);

  // Add months to the beginning of the list
  const addMonthsToBeginning = useCallback(() => {
    if (isLoadingStart || months.length === 0) return;

    setIsLoadingStart(true);

    const firstMonth = months[0];
    const newMonths: MonthData[] = [];

    for (let i = 1; i <= MONTHS_TO_LOAD / 2; i++) {
      let year = firstMonth.year;
      let month = firstMonth.month - i;

      if (month < 0) {
        month = 12 + month;
        year -= 1;
      }

      newMonths.unshift(getMonthData(year, month));
    }

    setMonths((prev) => [...newMonths, ...prev]);

    setTimeout(() => {
      setIsLoadingStart(false);
    }, 300);
  }, [months, isLoadingStart]);

  // Add months to the end of the list
  const addMonthsToEnd = useCallback(() => {
    if (isLoadingEnd || months.length === 0) return;

    setIsLoadingEnd(true);

    const lastMonth = months[months.length - 1];
    const newMonths: MonthData[] = [];

    for (let i = 1; i <= MONTHS_TO_LOAD / 2; i++) {
      let year = lastMonth.year;
      let month = lastMonth.month + i;

      if (month > 11) {
        month = month - 12;
        year += 1;
      }

      newMonths.push(getMonthData(year, month));
    }

    setMonths((prev) => [...prev, ...newMonths]);

    setTimeout(() => {
      setIsLoadingEnd(false);
    }, 300);
  }, [months, isLoadingEnd]);

  // Handle selection of a day
  const handleDayPress = useCallback(
    (date: Date) => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      onDayChange(date);
    },
    [onDayChange]
  );

  // Once the list is ready, scroll to the section containing the selected month
  const handleListReady = useCallback(() => {
    if (months.length > 0 && listRef.current) {
      const indexToScroll = getSelectedMonthIndex();
      if (indexToScroll !== -1) {
        requestAnimationFrame(() => {
          if (listRef.current) {
            listRef.current.scrollToLocation({
              sectionIndex: indexToScroll,
              itemIndex: 0,
              animated: false,
              viewOffset: 0,
            });

            setTimeout(() => {
              setInitialScrollComplete(true);
            }, 300);
          }
        });
      }
    }
  }, [months, getSelectedMonthIndex]);

  // Render a single day cell
  const renderDay = useCallback(
    (day: DayItem) => {
      const isToday = isSameDay(day.date, today);
      const isSelected = isSameDay(day.date, selectedDate);

      return (
        <TouchableOpacity
          key={day.id}
          onPress={() => handleDayPress(day.date)}
          style={{
            width: `${100 / DAYS_IN_WEEK}%`,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={[
              {
                width: 40,
                height: 40,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: isSelected ? colors.primary : 'transparent',
                borderWidth: isToday && !isSelected ? 2 : 0,
                borderColor: isToday && !isSelected ? colors.primary : 'transparent',
              },
            ]}>
            <Text
              title={day.date.getDate().toString()}
              color={
                isSelected ? 'background' : !day.isCurrentMonth ? 'mutedForeground' : 'foreground'
              }
              weight={isToday || isSelected ? 'semibold' : 'regular'}
              size="sm"
            />
          </View>
        </TouchableOpacity>
      );
    },
    [colors, handleDayPress, selectedDate, today]
  );

  // Render weekday headers
  const renderWeekdays = useCallback(() => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: spacing.$2,
          paddingVertical: spacing.$2,
          backgroundColor: colors.background,
        }}>
        {weekdays.map((day) => (
          <View
            key={day}
            style={{
              width: `${100 / DAYS_IN_WEEK}%`,
              alignItems: 'center',
              padding: spacing.$2,
            }}>
            <Text title={day} color="mutedForeground" size="xs" weight="medium" />
          </View>
        ))}
      </View>
    );
  }, [spacing, colors]);

  // Prepare section list data format
  const sectionListData = months.map((month) => ({
    title: month.title,
    id: month.id,
    data: month.weeks,
  }));

  // Render a month section header
  const renderSectionHeader = useCallback(
    ({ section }: { section: SectionListData<DayItem[], MonthSection> }) => {
      return (
        <View
          style={{
            backgroundColor: colors.background,
            paddingVertical: spacing.$2,
            paddingHorizontal: spacing.$4,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
          }}>
          <Text title={section.title} size="lg" weight="semibold" />
          {renderWeekdays()}
        </View>
      );
    },
    [colors, renderWeekdays, spacing]
  );

  // Render a week of days
  const renderWeek = useCallback(
    ({ item }: { item: DayItem[] }) => {
      return (
        <View
          style={{
            flexDirection: 'row',
            marginBottom: spacing.$2,
            paddingHorizontal: spacing.$4,
          }}>
          {item.map((day) => renderDay(day))}
        </View>
      );
    },
    [renderDay, spacing]
  );

  // Render loading indicators
  const ListHeaderComponent = useCallback(() => {
    if (isLoadingStart) {
      return (
        <View padding={spacing.$4} alignItems="center">
          <Text title="Loading earlier months..." color="mutedForeground" size="sm" />
        </View>
      );
    }
    return null;
  }, [isLoadingStart, spacing]);

  const ListFooterComponent = useCallback(() => {
    if (isLoadingEnd) {
      return (
        <View padding={spacing.$4} alignItems="center">
          <Text title="Loading more months..." color="mutedForeground" size="sm" />
        </View>
      );
    }
    return null;
  }, [isLoadingEnd, spacing]);

  // Handle reaching the end of the list
  const handleEndReached = useCallback(() => {
    if (!isLoadingEnd) {
      addMonthsToEnd();
    }
  }, [addMonthsToEnd, isLoadingEnd]);

  // Check if we're near the start of the list to load more items at the beginning
  const onScroll = useCallback(
    (event: any) => {
      if (initialScrollComplete && !isLoadingStart && months.length > 0) {
        // Get scroll position
        const offset = event.nativeEvent.contentOffset.y;

        // If we're near the top, load more months at the beginning
        if (offset < 1000) {
          addMonthsToBeginning();
        }
      }
    },
    [initialScrollComplete, isLoadingStart, months.length, addMonthsToBeginning]
  );

  // Show loading state if months aren't ready
  if (months.length === 0) {
    return (
      <View alignItems="center" justifyContent="center" padding={spacing.$16}>
        <Text title="Loading calendar..." color="mutedForeground" size="md" />
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={{ flex: 1 }}>
      <Card style={{ flex: 1, padding: 0 }}>
        <SectionList
          ref={listRef}
          sections={sectionListData}
          renderItem={renderWeek}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={(item, index) => `week-${index}`}
          stickySectionHeadersEnabled={true}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          initialNumToRender={8}
        />
      </Card>
    </Animated.View>
  );
};
