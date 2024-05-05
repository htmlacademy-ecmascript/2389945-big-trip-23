import { getAllDestinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';
import { Event } from '../const.js';

export default class EventsModel {
  events = Array.from({ length: Event.COUNT }, getRandomEvent);
  destinations = getAllDestinations();
  eventsInfo = new Map();

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

  getEventInfo(event) {
    this.eventsInfo.set(event, {
      destination: this.getDestinationById(event.destination),
      selectedOffers: event.offers.map((offer) =>
        this.getOfferById(event.type, offer)
      ),
    });
  }

  applyEventsInfo() {
    this.events.forEach((item) => {
      this.getEventInfo(item);
    });
    return this.eventsInfo;
  }
}
