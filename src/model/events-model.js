import { getAllDestinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';
import { Event } from '../const.js';


export default class EventsModel {
  events = Array.from({ length: Event.COUNT }, getRandomEvent);
  destinations = getAllDestinations();

  getAllDestinations() {
    return this.destinations;
  }

  getDestinationById(id) {
    return this.destinations.find((item) => item.id === id);
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
