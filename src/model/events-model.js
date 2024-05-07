import { Event } from '../const.js';
import { getAllDestinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';

export default class EventsModel {
  #events = Array.from({ length: Event.COUNT }, getRandomEvent);
  #destinations = getAllDestinations();
  #eventsInfo = new Map();

  #getDestinationById(id) {
    return this.#destinations.find((item) => item.id === id);
  }

  #getOfferById(type, id) {
    return getAllOffers()
      .find((item) => item.type === type)
      .offers.find((item) => item.id === id);
  }

  getAllDestinations() {
    return this.#destinations;
  }

  getOffersByType(type) {
    return getAllOffers().find((item) => item.type === type);
  }

  #getEventInfo(event) {
    this.#eventsInfo.set(event, {
      destination: this.#getDestinationById(event.destination),
      selectedOffers: event.offers.map((offer) =>
        this.#getOfferById(event.type, offer)
      ),
    });
  }

  get events() {
    return this.#events;
  }

  applyEventsInfo() {
    this.#events.forEach((item) => {
      this.#getEventInfo(item);
    });
    return this.#eventsInfo;
  }
}
