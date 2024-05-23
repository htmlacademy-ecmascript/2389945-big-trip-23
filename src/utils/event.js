import dayjs from 'dayjs';
import { getAllOffers } from '../mock/offers';
import { getAllDestinations } from '../mock/destinations';
import { formatDate } from './common';
import { DateTimeSettings } from '../const';

export const isEventPresent = (dateFrom, dateTo) =>
  dayjs().isAfter(dayjs(dateFrom)) && dayjs().isBefore(dayjs(dateTo));

export const isEventPast = (date) => dayjs().isAfter(dayjs(date));

export const isEventFuture = (date) => dayjs().isBefore(dayjs(date));

export const getOfferById = (offers, type, id) =>
  offers
    .find((offer) => offer.type === type)
    .offers.find((item) => item.id === id);

export const calcTotalEventPrice = (event) => {
  const allOffers = getAllOffers();
  return (
    event.basePrice +
    event.offers.reduce(
      (sum, offer) => sum + getOfferById(allOffers, event.type, offer).price,
      0
    )
  );
};

export const calcTotalPrice = (events) =>
  events.reduce((sum, event) => sum + calcTotalEventPrice(event), 0);

export const getDestinationById = (destinations, id) =>
  destinations.find((destination) => destination.id === id);

export const getRoute = (events) => {
  let route = '';
  let routeDates = '';
  const eventsLength = events.length;
  const allDestinations = getAllDestinations();
  const eventFirst = events[0];
  const eventLast = events[eventsLength - 1];

  routeDates = `${formatDate(
    eventFirst.dateFrom,
    DateTimeSettings.ROUTE_DATE_FORMAT
  )}&nbsp;&mdash;&nbsp;${formatDate(
    eventLast.dateTo,
    DateTimeSettings.ROUTE_DATE_FORMAT
  )}`;

  if (eventsLength <= 3) {
    route = events
      .map(
        (event) => getDestinationById(allDestinations, event.destination).name
      )
      .join(' &mdash; ');

    return { route, routeDates };
  }

  const firstRoutePoint = getDestinationById(
    allDestinations,
    eventFirst.destination
  );

  const lastRoutePoint = getDestinationById(
    allDestinations,
    eventLast.destination
  );

  route = `${firstRoutePoint.name} &mdash; ... &mdash;
      ${lastRoutePoint.name}`;

  return { route, routeDates };
};
