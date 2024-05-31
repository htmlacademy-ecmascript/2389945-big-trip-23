import { formatDate } from './common';
import { DateTimeSetting } from '../const';

const getOfferById = (offers, type, id) =>
  offers
    .find((offer) => offer.type === type)
    .offers.find((item) => item.id === id);

const calcTotalEventPrice = (event, offers) => event.basePrice +
  event.offers.reduce(
    (sum, offer) => sum + getOfferById(offers, event.type, offer).price,
    0
  );

const calcTotalPrice = (events, offers) =>
  events.reduce((sum, event) => sum + calcTotalEventPrice(event, offers), 0);

const getDestinationById = (destinations, id) =>
  destinations.find((destination) => destination.id === id);

const getRoute = (events, destinations) => {
  let route = '';
  let routeDates = '';
  const eventsLength = events.length;
  const eventFirst = events[0];
  const eventLast = events[eventsLength - 1];

  routeDates = `${formatDate(
    eventFirst.dateFrom,
    DateTimeSetting.ROUTE_DATE_FORMAT
  )}&nbsp;&mdash;&nbsp;${formatDate(
    eventLast.dateTo,
    DateTimeSetting.ROUTE_DATE_FORMAT
  )}`;

  if (eventsLength <= 3) {
    route = events
      .map((event) => getDestinationById(destinations, event.destination).name)
      .join(' &mdash; ');

    return { route, routeDates };
  }

  const firstRoutePoint = getDestinationById(
    destinations,
    eventFirst.destination
  );

  const lastRoutePoint = getDestinationById(
    destinations,
    eventLast.destination
  );

  route = `${firstRoutePoint.name} &mdash; ... &mdash; ${lastRoutePoint.name}`;

  return { route, routeDates };
};

export { getOfferById, calcTotalPrice, getDestinationById, getRoute };
