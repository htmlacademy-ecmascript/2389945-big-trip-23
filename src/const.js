export const Event = {
  LIST_TIME_FORMAT: 'HH:mm',
  LIST_DATE_FORMAT: 'MMM DD',
  EDIT_DATE_FORMAT: 'DD/MM/YY HH:mm',
  COUNT: 5,
};

export const FilterType = {
  EVERYTHING: {
    name: 'everything',
    message: 'Click New Event to create your first point',
  },
  FUTURE: { name: 'future', message: 'There are no future events now' },
  PRESENT: { name: 'present', message: 'There are no present events now' },
  PAST: { name: 'past', message: 'There are no past events now' },
};

export const DAY_HOURS = 24;
export const HOUR_MINUTES = 60;
