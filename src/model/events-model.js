import { getAllDestinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';

const EVENT_COUNT = 3;

export default class EventsModel {
  events = Array.from({ length: EVENT_COUNT }, getRandomEvent);

  getDestinationById(id) {
    return getAllDestinations().find((item) => item.id === id);
  }

  getOffersByType(type) {
    return getAllOffers().find((item) => item.type === type);
  }

  getOfferById(id) {
    return getAllOffers()
      .find((item) => item.offers.id === id)
      .offers.find((item) => item.id);
  }

  getEvents() {
    return this.events;
  }

  getExtEvents() {
    const extEvents = new Map();
    this.events.forEach((item) => {
      extEvents.set(item, {
        cityName: this.getDestinationById(item.destination).name,
        offers: item.offers.map((offer) => this.getOfferById(offer.id)),
      });
    });
    return extEvents;
  }
}
