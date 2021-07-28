import { createContext, useState } from "react";

interface DateRangeProps {
  dateRange: any; //TODO: fix
  setDateRange: (dateRange: any) => void;
}

const DateRangeContext = createContext<DateRangeProps>({
  dateRange: null,
  setDateRange: () => {},
});

export default DateRangeContext;
