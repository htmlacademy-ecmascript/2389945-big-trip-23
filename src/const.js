export const DateTimeSettings = {
  LIST_TIME_FORMAT: 'HH:mm',
  LIST_DATE_FORMAT: 'MMM DD',
  EDIT_DATE_FORMAT: 'DD/MM/YY HH:mm',
  DAY_HOURS: 24,
  HOUR_MINUTES: 60,
};

export const EventMode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export const EventSettings = {
  ITEM_COUNT: 5,
  PRICE_PATTERN: /^[\D0]+|\D/g
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

export const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price'
};

