import { FilterType, SortType } from '../const.js';
import { RenderPosition, render } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import {
  sortEventsByDay,
  sortEventsByPrice,
  sortEventsByTime,
} from '../utils/sort.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventPresenter from './event-presenter.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #container = null;
  #eventsModel = null;
  #tripEvents = [];

  #allDestinations = null;
  #allOffers = null;

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
    this.#tripEvents = [...this.#eventsModel.events];
    this.#allDestinations = this.#eventsModel.getAllDestinations();
    this.#allOffers = this.#eventsModel.getAllOffers();

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
    const sortFunctionMap = {
      [SortType.DAY]: sortEventsByDay,
      [SortType.TIME]: sortEventsByTime,
      [SortType.PRICE]: sortEventsByPrice,
    };

    const sortFunction = sortFunctionMap[sortType];

    if (sortFunction) {
      this.#tripEvents.sort(sortFunction);
    } else {
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
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
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
