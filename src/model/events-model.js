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

  getOfferById(type, id) {
    return getAllOffers()
      .find((item) => item.type === type)
      .offers.find((item) => item.id === id);
  }

  getEvents() {
    return this.events;
  }

  getEventsInfo() {
    const eventsInfo = new Map();
    this.events.forEach((item) => {
      const destination = this.getDestinationById(item.destination);
      eventsInfo.set(item, {
        destination: destination,
        selectedOffers: item.offers.map((offer) =>
          this.getOfferById(item.type, offer)
        ),
        availableOffers: this.getOffersByType(item.type).offers,
      });
    });
    return eventsInfo;
  }
}
