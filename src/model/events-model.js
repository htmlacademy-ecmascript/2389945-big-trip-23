import { EventSettings } from '../const.js';
import { getAllDestinations } from '../mock/destinations.js';
import { tripEvents } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';
import { getUniqueRandomArray } from '../utils/common.js';

export default class EventsModel {
  #events = getUniqueRandomArray(tripEvents, EventSettings.ITEM_COUNT);
  #destinations = getAllDestinations();
  #offers = getAllOffers();

  get events() {
    return this.#events;
  }

  getAllDestinations = () => this.#destinations;
  getAllOffers = () => this.#offers;
}
