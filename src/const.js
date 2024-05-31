const Connection = {
  AUTHORIZATION: 'Basic xS2d557gsdsgdf3478k',
  END_POINT: 'https://23.objects.htmlacademy.pro/big-trip',
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const EVENT_PRICE_PATTERN = /[0-9]/;

const DateTimeSetting = {
  LIST_TIME_FORMAT: 'HH:mm',
  LIST_DATE_FORMAT: 'MMM DD',
  EDIT_DATE_FORMAT: 'DD/MM/YY HH:mm',
  ROUTE_DATE_FORMAT: 'DD MMM',
  DAY_HOURS: 24,
  HOUR_MINUTES: 60,
};

const EventMode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const EventsMessage = {
  LOADING: 'Loading...',
  ERROR: 'Failed to load latest route information',
};

const SortType = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const UserAction = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  ERROR: 'ERROR',
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export {
  Connection,
  EVENT_PRICE_PATTERN,
  Method,
  DateTimeSetting,
  EventMode,
  FilterType,
  EventsMessage,
  SortType,
  UserAction,
  UpdateType,
  TimeLimit,
};
