import { Event } from '../const.js';
import { getAllDestinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';

export default class EventsModel {
  #events = Array.from({ length: Event.COUNT }, getRandomEvent);
  #eventsInfo = new Map();
  #destinations = getAllDestinations();


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

  #applyEventsInfo() {
    this.#events.forEach((item) => {
      this.#getEventInfo(item);
    });
    return this.#eventsInfo;
  }

  get events() {
    return this.#events;
  }

  get eventsInfo() {
    return this.#applyEventsInfo();
  }

}
