import { create } from 'zustand';

type CalendarStore = {
  selectedDate: Date;
  action: {
    onDayChange: (date: Date) => void;
  };
};

export const useCalendarStore = create<CalendarStore>((set) => ({
  selectedDate: new Date(),
  action: {
    onDayChange: (date: Date) => set({ selectedDate: date }),
  },
}));
