export interface Event {
  title: string;
  date: string;
  notes: string;
  bunting: boolean;
}

export interface Country {
  division: string;
  events: Event[];
}

export interface BankHolidayResponse {
  'england-and-wales': Country;
  scotland: Country;
  'northern-ireland': Country;
}
