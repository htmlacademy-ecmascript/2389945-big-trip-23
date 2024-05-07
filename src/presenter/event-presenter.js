import { render } from '../framework/render.js';
import EventEditPointView from '../view/event-edit-point-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';

export default class EventPresenter {
  #eventsListElement = new EventsListView();
  #container = null;
  #eventsModel = null;
  #tripEvents = [];
  #tripEventsInfo = null;

  constructor({ container, eventsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#tripEvents = [...this.#eventsModel.events];
    this.#tripEventsInfo = new Map([...this.#eventsModel.applyEventsInfo()]);

    const allDestinations = this.#eventsModel.getAllDestinations();
    const availableOffers = (item) =>
      this.#eventsModel.getOffersByType(this.#tripEvents[item].type).offers;

    render(new TripSortView(), this.#container);
    render(this.#eventsListElement, this.#container);
    render(
      new EventEditPointView({
        event: this.#tripEvents[0],
        eventInfo: this.#tripEventsInfo.get(this.#tripEvents[0]),

        allDestinations: allDestinations,
        availableOffers: availableOffers(0),
      }),
      this.#eventsListElement.element
    );

    for (let i = 1; i < this.#tripEvents.length; i++) {
      render(
        new EventsItemView({
          event: this.#tripEvents[i],
          eventInfo: this.#tripEventsInfo.get(this.#tripEvents[i]),
          allDestinations: allDestinations,
          availableOffers: availableOffers(i),
        }),
        this.#eventsListElement.element
      );
    }
  }
}
