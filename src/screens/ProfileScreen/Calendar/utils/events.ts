export type EventItem = {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
};

export type DayData = {
  date: Date;
  events: EventItem[];
  id: string;
};

// Create mock events throughout the current month
export const generateMockEvents = (): EventItem[] => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  return [
    // Current day events
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(year, month, currentDate.getDate()),
      time: '9:00 AM - 10:00 AM',
      location: 'Conference Room A',
    },
    {
      id: '2',
      title: 'Lunch with Client',
      date: new Date(year, month, currentDate.getDate()),
      time: '12:30 PM - 1:30 PM',
      location: 'Downtown Restaurant',
    },
    {
      id: '3',
      title: 'Project Review',
      date: new Date(year, month, currentDate.getDate()),
      time: '3:00 PM - 4:00 PM',
      location: 'Main Office',
    },

    // Events 3 days from now
    {
      id: '4',
      title: 'Product Launch',
      date: new Date(year, month, currentDate.getDate() + 3),
      time: '11:00 AM - 1:00 PM',
      location: 'Main Hall',
    },

    // Events 5 days from now
    {
      id: '5',
      title: 'Investor Meeting',
      date: new Date(year, month, currentDate.getDate() + 5),
      time: '2:00 PM - 3:30 PM',
      location: 'Executive Boardroom',
    },
    {
      id: '6',
      title: 'Marketing Strategy',
      date: new Date(year, month, currentDate.getDate() + 5),
      time: '4:00 PM - 5:00 PM',
      location: 'Creative Lab',
    },

    // Events 10 days from now
    {
      id: '7',
      title: 'Quarterly Review',
      date: new Date(year, month, currentDate.getDate() + 10),
      time: '9:00 AM - 12:00 PM',
      location: 'Auditorium',
    },

    // Events 12 days from now
    {
      id: '8',
      title: 'Team Building',
      date: new Date(year, month, currentDate.getDate() + 12),
      time: '1:00 PM - 5:00 PM',
      location: 'City Park',
    },

    // Events 15 days from now
    {
      id: '9',
      title: 'Client Presentation',
      date: new Date(year, month, currentDate.getDate() + 15),
      time: '10:00 AM - 11:00 AM',
      location: 'Conference Room B',
    },

    // Events 18 days from now
    {
      id: '10',
      title: 'Design Workshop',
      date: new Date(year, month, currentDate.getDate() + 18),
      time: '2:00 PM - 4:00 PM',
      location: 'Design Studio',
    },

    // Events 20 days from now
    {
      id: '11',
      title: 'Budget Planning',
      date: new Date(year, month, currentDate.getDate() + 20),
      time: '11:00 AM - 12:30 PM',
      location: 'Finance Room',
    },

    // Events 25 days from now
    {
      id: '12',
      title: 'Innovation Brainstorm',
      date: new Date(year, month, currentDate.getDate() + 25),
      time: '1:00 PM - 3:00 PM',
      location: 'Idea Lab',
    },
    {
      id: '13',
      title: 'Product Demo',
      date: new Date(year, month, currentDate.getDate() + 25),
      time: '3:30 PM - 4:30 PM',
      location: 'Demo Room',
    },

    // Events 28 days from now
    {
      id: '14',
      title: 'Monthly Wrap-up',
      date: new Date(year, month, currentDate.getDate() + 28),
      time: '4:00 PM - 5:00 PM',
      location: 'Main Hall',
    },
  ];
};

// Store mock events
export const mockEvents = generateMockEvents();

// Check if a date has events
export const hasEvents = (date: Date): boolean => {
  return mockEvents.some((event) => isSameDay(event.date, date));
};

// Get events for a specific date
export const getEventsForDate = (date: Date): EventItem[] => {
  return mockEvents.filter((event) => isSameDay(event.date, date));
};

// Check if two dates represent the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

// Format date to a unique string ID
export const formatDateToId = (date: Date): string => {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

// Get a range of dates with their events for the agenda view
export const getDateRange = (centerDate: Date, daysBeforeAfter: number = 45): DayData[] => {
  const result: DayData[] = [];

  // Generate dates starting from daysBeforeAfter days before centerDate
  const startDate = new Date(centerDate);
  startDate.setDate(centerDate.getDate() - daysBeforeAfter);

  // Create a range of dates spanning daysBeforeAfter before and after centerDate
  for (let i = 0; i < daysBeforeAfter * 2 + 1; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    result.push({
      date: currentDate,
      events: getEventsForDate(currentDate),
      id: formatDateToId(currentDate),
    });
  }

  return result;
};
