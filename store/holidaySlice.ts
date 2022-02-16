import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {BankHolidayResponse, BankHolidayWithId} from '../types';
import type {RootState} from './';

// Define a type for the slice state
interface HolidayState {
  items: BankHolidayWithId[] | null;
}

// Define the initial state using that type
const initialState: HolidayState = {
  items: null,
};

const isFutureDatePredicate = (value: string) => {
  const now = new Date();
  const dateToTest = new Date(value);
  return now.getTime() <= dateToTest.getTime();
};

const getUpcomingBankHolidays = (
  data: BankHolidayResponse,
): BankHolidayWithId[] => {
  const events = data['england-and-wales'].events;
  const futureEvents = events.filter(event => {
    return isFutureDatePredicate(event.date);
  });

  return futureEvents.slice(0, 5).map((event, index) => ({
    ...event,
    date: new Date(event.date).toLocaleDateString(),
    // Adding an ID for ease of updates later
    id: index,
  }));
};

export const fetchHolidays = createAsyncThunk(
  'holiday/fetchHolidayStatus',
  async () => {
    const res = await fetch('https://gov.uk/bank-holidays.json');
    const json: BankHolidayResponse = await res.json();
    return getUpcomingBankHolidays(json);
  },
);

export const holidaySlice = createSlice({
  name: 'holiday',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateEntry: (state, action: PayloadAction<BankHolidayWithId>) => {
      if (state.items) {
        const indexToUpdate = state.items.findIndex(
          item => item.id === action.payload.id,
        );

        state.items[indexToUpdate] = action.payload;
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchHolidays.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export const {updateEntry} = holidaySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectHolidays = (state: RootState) => state.holidays.items;

export default holidaySlice.reducer;
