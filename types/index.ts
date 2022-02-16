export interface BankHoliday {
  title: string;
  date: string;
  notes: string;
  bunting: boolean;
}

export interface BankHolidayWithId extends BankHoliday {
  id: number;
}

export interface Country {
  division: string;
  events: BankHoliday[];
}

export interface BankHolidayResponse {
  'england-and-wales': Country;
  scotland: Country;
  'northern-ireland': Country;
}
