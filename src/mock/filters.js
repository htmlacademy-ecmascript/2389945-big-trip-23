import { filter } from '../utils/filter.js';

export const generateFilters = (events) =>
  Object.entries(filter).map(([filterType, filterEvents]) => ({
    type: filterType,
    count: filterEvents(events).length,
  }));

