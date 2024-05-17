import { FilterType } from '../const.js';
import { RenderPosition, render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventPresenter from './event-presenter.js';
import {
  sortEventsByDay,
  sortEventsByTime,
  sortEventsByPrice,
} from '../utils/sort.js';
import { SortType } from '../const.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #container = null;
  #eventsModel = null;
  #tripEvents = [];
  #tripEventsInfo = null;

  #allDestinations = null;
  #availableOffers = null;

  #sortComponent = null;
  #messageComponent = new EventsMessageView();

  #eventPresenters = new Map();
  #currentSortType = null;
  #sourcedTripEvents = [];

  constructor({ container, eventsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#eventsModel.eventsInfo = this.#eventsModel.events;
    this.#tripEvents = [...this.#eventsModel.events];
    this.#tripEventsInfo = new Map([...this.#eventsModel.eventsInfo]);
    this.#allDestinations = this.#eventsModel.getAllDestinations();

    this.#sourcedTripEvents = [...this.#eventsModel.events];

    this.#renderTrip();
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleEventChange = (updatedEvent) => {
    this.#tripEvents = updateItem(this.#tripEvents, updatedEvent);
    this.#sourcedTripEvents = updateItem(this.#sourcedTripEvents, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.#tripEvents.sort(sortEventsByDay);
        break;
      case SortType.TIME:
        this.#tripEvents.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this.#tripEvents.sort(sortEventsByPrice);
        break;
      default:
        this.#tripEvents = [...this.#sourcedTripEvents];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType = SortType.DAY) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEvents();
    this.#renderEvents();
  };

  #renderSort = () => {
    this.#sortComponent = new TripSortView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#container, RenderPosition.AFTERBEGIN);
  };

  #renderNoEvents = (message) => {
    render(
      this.#messageComponent(message),
      this.#container,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderEvent = (event) => {
    this.#availableOffers = this.#eventsModel.getOffersByType(
      event.type
    ).offers;
    const eventInfo = this.#tripEventsInfo.get(event);
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      eventInfo: eventInfo,
      allDestinations: this.#allDestinations,
      availableOffers: this.#availableOffers,
      onDataChange: this.#handleEventChange,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderEvents = () => {
    this.#tripEvents.forEach((event) => this.#renderEvent(event));
  };

  #clearEvents() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderTrip = () => {
    render(this.#eventsListComponent, this.#container);

    if (!this.#tripEvents.length) {
      this.#renderNoEvents(FilterType.EVERYTHING.message);
      return;
    }

    this.#renderSort();
    this.#renderEvents();
    this.#handleSortTypeChange();
  };
}
