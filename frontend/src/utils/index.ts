import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';

export const getDates = (month: Date) => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  return {
    monthStart,
    monthEnd,
    startDate,
    endDate,
  };
};
