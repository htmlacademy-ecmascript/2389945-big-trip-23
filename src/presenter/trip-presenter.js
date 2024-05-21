import { FilterType, SortType, UpdateType, UserAction } from '../const.js';
import { RenderPosition, render, remove } from '../framework/render.js';
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

  #allDestinations = null;
  #allOffers = null;

  #sortComponent = null;
  #messageComponent = new EventsMessageView();

  #eventPresenters = new Map();
  #currentSortType = SortType.DAY;

  constructor({ container, eventsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#eventsModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    this.#sortEvents(this.#currentSortType);
    return this.#eventsModel.events;
  }

  init = () => {
    this.#allDestinations = this.#eventsModel.getAllDestinations();
    this.#allOffers = this.#eventsModel.getAllOffers();

    this.#renderTrip();
  };

  #sortEvents = (sortType) => {
    const sortFunctionMap = {
      [SortType.DAY]: sortEventsByDay,
      [SortType.TIME]: sortEventsByTime,
      [SortType.PRICE]: sortEventsByPrice,
    };

    const sortFunction = sortFunctionMap[sortType];

    if (sortFunction) {
      this.#eventsModel.events.sort(sortFunction);
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this.#eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this.#eventsModel.deleteEvent(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearTrip();
        this.#renderTrip();
        break;
      case UpdateType.MAJOR:
        this.#clearTrip({
          resetSortType: true,
        });
        this.#renderTrip();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip({ resetRenderedTaskCount: true });
    this.#renderTrip();
  };

  #renderSort = () => {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
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
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderEvents = (events) => {
    events.forEach((event) => this.#renderEvent(event));
  };

  #clearEvents() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #clearTrip({ resetSortType = false } = {}) {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#sortComponent);
    remove(this.#messageComponent);

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip = () => {
    render(this.#eventsListComponent, this.#container);

    const events = this.events;
    const eventCount = events.length;

    if (eventCount === 0) {
      this.#renderNoEvents(FilterType.EVERYTHING.message);
      return;
    }

    this.#renderSort();
    this.#renderEvents(this.events);
  };
}
