import { getAllDestinations } from '../mock/destinations.js';
import { getRandomEvent } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';
import { EVENTS_ITEM_COUNT } from '../const.js';

export default class EventsModel {
  #events = Array.from({ length: EVENTS_ITEM_COUNT }, getRandomEvent);
  #eventsInfo = new Map();
  #destinations = getAllDestinations();
  #offers = getAllOffers();

  get events() {
    return this.#events;
  }

  get eventsInfo() {
    return this.#eventsInfo;
  }

  set eventsInfo(events) {
    events.forEach((event) => {
      this.#applyEventInfo(event);
    });
  }

  getAllDestinations = () => this.#destinations;

  getOffersByType = (type) => this.#offers.find((item) => item.type === type);

  #getDestinationById = (id) =>
    this.#destinations.find((item) => item.id === id);

  #getOfferById = (type, id) =>
    this.#offers
      .find((item) => item.type === type)
      .offers.find((item) => item.id === id);

  #applyEventInfo = (event) => {
    this.#eventsInfo.set(event, {
      destination: this.#getDestinationById(event.destination),
      selectedOffers: event.offers.map((offer) =>
        this.#getOfferById(event.type, offer)
      ),
    });
  };
}
