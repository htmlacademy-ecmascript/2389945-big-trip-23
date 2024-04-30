import { getAllDestinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';
import { EVENT_COUNT } from '../const.js';


export default class EventsModel {
  events = Array.from({ length: EVENT_COUNT }, getRandomEvent);

  getAllDestinations() {
    return getAllDestinations();
  }

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
      eventsInfo.set(item, {
        destination: this.getDestinationById(item.destination),
        selectedOffers: item.offers.map((offer) =>
          this.getOfferById(item.type, offer)
        ),
      });
    });
    return eventsInfo;
  }
}
