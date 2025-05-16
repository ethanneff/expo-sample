import { FlashList } from '@shopify/flash-list';
import * as Haptics from 'expo-haptics';
import { useCallback, useEffect, useRef, useState } from 'react';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Card } from '~/components/Card/Card';
import { Text } from '~/components/Text/Text';
import { View } from '~/components/View/View';
import { useCalendarStore } from '~/screens/SettingsScreen/useCalendarStore';
import { useQueryCalendarEvents } from '~/screens/SettingsScreen/useQueryCalendarEvents';
import { useAppTheme } from '~/theme/useAppTheme';

// Type definitions
interface EventItem {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
}

interface DayData {
  date: Date;
  events: EventItem[];
  id: string;
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

const getDateRange = (centerDate: Date, totalDays: number): DayData[] => {
  const halfDays = Math.floor(totalDays / 2);
  const startDate = new Date(centerDate);
  startDate.setDate(centerDate.getDate() - halfDays);

  const range: DayData[] = [];
  for (let i = 0; i < totalDays; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    range.push({
      date: currentDate,
      events: [],
      id: formatDateToId(currentDate),
    });
  }

  return range;
};

// Number of days to load at a time during infinite scroll
const DAYS_TO_LOAD = 30;
// Scroll position threshold to trigger loading at the beginning (in pixels)
const START_THRESHOLD = 1000;

export const AgendaView = () => {
  const selectedDate = useCalendarStore((state) => state.selectedDate);
  const onDateChange = useCalendarStore((state) => state.action.onDayChange);
  const { colors, spacing } = useAppTheme();

  // Calendar events query hook
  const { fetch: fetchEvents, data: calendarEvents, loading } = useQueryCalendarEvents();

  const [dateRange, setDateRange] = useState<DayData[]>([]);
  const listRef = useRef<FlashList<DayData>>(null);
  const [initialScrollComplete, setInitialScrollComplete] = useState(false);
  const [isLoadingStart, setIsLoadingStart] = useState(false);
  const [isLoadingEnd, setIsLoadingEnd] = useState(false);

  // Group calendar events by date
  const getEventsForDate = useCallback(
    (date: Date) => {
      if (!calendarEvents || calendarEvents.length === 0) return [];

      return calendarEvents
        .filter((event) => isSameDay(new Date(event.start), date))
        .map((event) => ({
          id: event.id,
          title: event.title,
          date: new Date(event.start),
          time: `${new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
          location: event.location || 'No location',
        }));
    },
    [calendarEvents]
  );

  // Generate the initial date range, centered around the selected date
  useEffect(() => {
    if (dateRange.length === 0) {
      const range = getDateRange(selectedDate, 45);
      setDateRange(range);

      // Fetch events for the date range
      const startDate = range[0].date;
      const endDate = range[range.length - 1].date;
      fetchEvents(startDate.toISOString(), endDate.toISOString());
    }
  }, [selectedDate, dateRange.length, fetchEvents]);

  // Find the index of the selected date in our date range
  const getSelectedDateIndex = useCallback(() => {
    const selectedId = formatDateToId(selectedDate);
    return dateRange.findIndex((day) => day.id === selectedId);
  }, [dateRange, selectedDate]);

  // When the selected date changes and isn't in our range, reset the range
  useEffect(() => {
    if (dateRange.length > 0) {
      const selectedId = formatDateToId(selectedDate);
      const dateExists = dateRange.some((day) => day.id === selectedId);

      if (!dateExists) {
        // Selected date is not in our current range, reset the entire range
        const range = getDateRange(selectedDate, 45);
        setDateRange(range);
        setInitialScrollComplete(false);

        // Fetch events for the new date range
        const startDate = range[0].date;
        const endDate = range[range.length - 1].date;
        fetchEvents(startDate.toISOString(), endDate.toISOString());
      }
    }
  }, [selectedDate, dateRange, fetchEvents]);

  // Update events when calendar data changes
  useEffect(() => {
    if (calendarEvents && dateRange.length > 0) {
      setDateRange((prevRange) =>
        prevRange.map((day) => ({
          ...day,
          events: getEventsForDate(day.date),
        }))
      );
    }
  }, [calendarEvents, getEventsForDate, dateRange.length]);

  // Add days to the beginning of the range
  const addDaysToBeginning = useCallback(() => {
    if (isLoadingStart || dateRange.length === 0) return;

    setIsLoadingStart(true);

    // Get the first date in our current range
    const firstDate = new Date(dateRange[0].date);

    // Generate dates before the first date
    const startDate = new Date(firstDate);
    startDate.setDate(firstDate.getDate() - DAYS_TO_LOAD);

    const newDays: DayData[] = [];
    for (let i = 0; i < DAYS_TO_LOAD; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);

      newDays.push({
        date: currentDate,
        events: [],
        id: formatDateToId(currentDate),
      });
    }

    // Fetch events for the new date range
    fetchEvents(startDate.toISOString(), firstDate.toISOString());

    // Prepend the new days to our existing range
    setDateRange((prevRange) => [...newDays, ...prevRange]);

    // Small delay to prevent rapid loading
    setTimeout(() => {
      setIsLoadingStart(false);
    }, 300);
  }, [dateRange, isLoadingStart, fetchEvents]);

  // Add days to the end of the range
  const addDaysToEnd = useCallback(() => {
    if (isLoadingEnd || dateRange.length === 0) return;

    setIsLoadingEnd(true);

    // Get the last date in our current range
    const lastDate = new Date(dateRange[dateRange.length - 1].date);

    // Generate dates after the last date
    const newDays: DayData[] = [];
    for (let i = 1; i <= DAYS_TO_LOAD; i++) {
      const currentDate = new Date(lastDate);
      currentDate.setDate(lastDate.getDate() + i);

      newDays.push({
        date: currentDate,
        events: [],
        id: formatDateToId(currentDate),
      });
    }

    // Fetch events for the new date range
    const endDate = new Date(lastDate);
    endDate.setDate(lastDate.getDate() + DAYS_TO_LOAD);
    fetchEvents(lastDate.toISOString(), endDate.toISOString());

    // Append the new days to our existing range
    setDateRange((prevRange) => [...prevRange, ...newDays]);

    // Small delay to prevent rapid loading
    setTimeout(() => {
      setIsLoadingEnd(false);
    }, 300);
  }, [dateRange, isLoadingEnd, fetchEvents]);

  // Track when items become visible to update the selected date
  const handleViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: { item: DayData; isViewable: boolean }[] }) => {
      if (viewableItems.length > 0 && initialScrollComplete) {
        // Get the most visible item (first one in the viewable array)
        const centerItem = viewableItems[0].item;

        // Only trigger date change if it's actually a different date
        if (centerItem && !isSameDay(centerItem.date, selectedDate) && onDateChange) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          onDateChange(centerItem.date);
        }
      }
    },
    [selectedDate, onDateChange, initialScrollComplete]
  );

  // Configure viewability with better settings for agenda view
  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50, // Lower threshold to make it more responsive
    minimumViewTime: 100, // Reduce minimum view time to make it more responsive
  });

  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: viewabilityConfig.current,
      onViewableItemsChanged: handleViewableItemsChanged,
    },
  ]);

  // Once the list is ready, scroll to the selected date
  const handleListReady = useCallback(() => {
    if (dateRange.length > 0 && listRef.current) {
      const indexToScroll = getSelectedDateIndex();
      if (indexToScroll !== -1) {
        // Use a requestAnimationFrame to ensure the list is ready
        requestAnimationFrame(() => {
          if (listRef.current) {
            listRef.current.scrollToIndex({
              index: indexToScroll,
              animated: false,
            });

            // Set this after initial scroll so viewability callback doesn't trigger date changes
            setTimeout(() => {
              setInitialScrollComplete(true);
            }, 300);
          }
        });
      }
    }
  }, [dateRange, getSelectedDateIndex]);

  // Handle onEndReached to load more items when scrolling to end
  const handleEndReached = useCallback(() => {
    if (!isLoadingEnd) {
      addDaysToEnd();
    }
  }, [addDaysToEnd, isLoadingEnd]);

  // Handle when user scrolls near the start to load earlier dates
  const handleStartReached = useCallback(() => {
    if (!isLoadingStart) {
      addDaysToBeginning();
    }
  }, [addDaysToBeginning, isLoadingStart]);

  // Check if we're near the start of the list to load more items at the beginning
  const onScroll = useCallback(
    (event: any) => {
      if (initialScrollComplete && !isLoadingStart && dateRange.length > 0) {
        // Get scroll position
        const offset = event.nativeEvent.contentOffset.y;

        // If near the start (top) of the list, load more at beginning
        if (offset < START_THRESHOLD) {
          handleStartReached();
        }
      }
    },
    [initialScrollComplete, isLoadingStart, dateRange.length, handleStartReached]
  );

  // Render an individual event item
  const renderEventItem = useCallback(
    (item: EventItem, index: number, totalItems: number) => {
      return (
        <View key={item.id}>
          <Text title={item.title} weight="medium" size="md" />
          <View paddingLeft={spacing.$16}>
            <Text title={item.time} size="sm" color="mutedForeground" />
            <Text title={item.location} size="sm" color="mutedForeground" />
          </View>
        </View>
      );
    },
    [spacing]
  );

  // Render a full day's agenda (header + events or empty state)
  const renderDayItem = useCallback(
    ({ item }: { item: DayData }) => {
      const dateHeader = item.date.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      });

      return (
        <View
          backgroundColor={colors.card}
          borderTopWidth={1.5}
          borderTopColor={colors.border}
          gap={spacing.$8}
          padding={spacing.$8}>
          <Text title={dateHeader} weight={'bold'} color={'primary'} size="md" />
          <View paddingLeft={spacing.$16} gap={spacing.$8}>
            {item.events.length === 0 ? (
              <Text
                title="No events for this day"
                color="mutedForeground"
                size="md"
                weight="regular"
              />
            ) : (
              item.events.map((event: EventItem, idx: number) =>
                renderEventItem(event, idx, item.events.length)
              )
            )}
          </View>
        </View>
      );
    },
    [colors, renderEventItem, spacing]
  );

  // Render a loading indicator at the top of the list
  const ListHeaderComponent = useCallback(() => {
    if (isLoadingStart) {
      return (
        <View paddingVertical={spacing.$12} alignItems="center">
          <Text title="Loading earlier dates..." color="mutedForeground" size="sm" />
        </View>
      );
    }
    return null;
  }, [isLoadingStart, spacing]);

  // Render a loading indicator at the bottom of the list
  const ListFooterComponent = useCallback(() => {
    if (isLoadingEnd) {
      return (
        <View paddingVertical={spacing.$12} alignItems="center">
          <Text title="Loading more dates..." color="mutedForeground" size="sm" />
        </View>
      );
    }
    return null;
  }, [isLoadingEnd, spacing]);

  // If data isn't ready yet, show a loading placeholder
  if (dateRange.length === 0) {
    return (
      <View alignItems="center" justifyContent="center" padding={spacing.$16}>
        <Text title="Loading agenda..." color="mutedForeground" size="md" />
      </View>
    );
  }

  return (
    <Animated.View entering={FadeIn.duration(300)} style={{ flex: 1 }}>
      <Card style={{ flex: 1, padding: 0, gap: spacing.$16 }}>
        <FlashList
          ref={listRef}
          data={dateRange}
          renderItem={renderDayItem}
          estimatedItemSize={100}
          onLoad={handleListReady}
          viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: spacing.$16 }}
          keyExtractor={(item) => item.id}
          snapToAlignment="start"
          snapToOffsets={dateRange.map((_, index) => index * 100)}
          pagingEnabled={false}
          scrollEventThrottle={16}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onScroll={onScroll}
          ListHeaderComponent={ListHeaderComponent}
          ListFooterComponent={ListFooterComponent}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: null,
          }}
        />
      </Card>
    </Animated.View>
  );
};
