import Observable from '../framework/observable.js';
import { EventSettings } from '../const.js';
import { getAllDestinations } from '../mock/destinations.js';
import { tripEvents } from '../mock/events.js';
import { getAllOffers } from '../mock/offers.js';
import { getUniqueRandomArray } from '../utils/common.js';

export default class EventsModel extends Observable {
  #events = getUniqueRandomArray(tripEvents, EventSettings.ITEM_COUNT);
  #destinations = getAllDestinations();
  #offers = getAllOffers();

  get events() {
    return this.#events;
  }

  updateEvent(updateType, update) {
    const index = this.#events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      update,
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this.#events = [
      update,
      ...this.#events,
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this.#events.findIndex((task) => task.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting task');
    }

    this.#events = [
      ...this.#events.slice(0, index),
      ...this.#events.slice(index + 1),
    ];

    this._notify(updateType);
  }

  getAllDestinations = () => this.#destinations;
  getAllOffers = () => this.#offers;
}
