import dayjs from 'dayjs';
import { getAllOffers } from '../mock/offers';

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
