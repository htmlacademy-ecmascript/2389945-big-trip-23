import {
  FilterType,
  FilterTypeMessage,
  SortType,
  UpdateType,
  UserAction,
} from '../const.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import {
  sortEventsByDay,
  sortEventsByPrice,
  sortEventsByTime,
} from '../utils/sort.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { filter } from '../utils/filter.js';
import { getKeyByValue } from '../utils/common.js';
import { calcTotalPrice, getRoute } from '../utils/event.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #mainContainer = null;
  #eventsContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #allDestinations = null;
  #allOffers = null;

  #infoComponent = null;
  #sortComponent = null;
  #messageComponent = null;

  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DAY;

  constructor({
    mainContainer,
    eventsContainer,
    eventsModel,
    filterModel,
    onNewEventDestroy,
  }) {
    this.#mainContainer = mainContainer;
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get events() {
    const filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    let filteredEvents = filter[filterType](events);

    filteredEvents = this.#sortEvents(this.#currentSortType, filteredEvents);
    return filteredEvents;
  }

  init = () => {
    this.#allDestinations = this.#eventsModel.getAllDestinations();
    this.#allOffers = this.#eventsModel.getAllOffers();

    this.#renderTrip();
  };

  createEvent() {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this.#newEventPresenter.init(this.#allDestinations, this.#allOffers);
  }

  #sortEvents = (sortType, filteredEvents) => {
    const sortFunctionMap = {
      [SortType.DAY]: sortEventsByDay,
      [SortType.TIME]: sortEventsByTime,
      [SortType.PRICE]: sortEventsByPrice,
    };

    const sortFunction = sortFunctionMap[sortType];

    if (sortFunction) {
      filteredEvents.sort(sortFunction);
    }
    return filteredEvents;
  };

  #handleModeChange = () => {
    this.#newEventPresenter.destroy();
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

  #renderInfo = () => {
    const route = getRoute(this.#eventsModel.events);
    this.#infoComponent = new TripInfoView({
      route: route.route,
      routeDates: route.routeDates,
      totalPrice: calcTotalPrice(this.#eventsModel.events),
    });

    render(this.#infoComponent, this.#mainContainer, RenderPosition.AFTERBEGIN);
  };

  #renderSort = () => {
    this.#sortComponent = new TripSortView({
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(
      this.#sortComponent,
      this.#eventsContainer,
      RenderPosition.AFTERBEGIN
    );
  };

  #renderNoEvents = (message) => {
    this.#messageComponent = new EventsMessageView(message);
    render(
      this.#messageComponent,
      this.#eventsContainer,
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

  #clearTrip({ resetSortType = false } = {}) {
    this.#newEventPresenter.destroy();
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();

    remove(this.#infoComponent);
    remove(this.#sortComponent);
    if (this.#messageComponent) {
      remove(this.#messageComponent);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DAY;
    }
  }

  #renderTrip = () => {
    render(this.#eventsListComponent, this.#eventsContainer);

    const events = this.events;
    const eventCount = events.length;

    if (eventCount === 0) {
      this.#renderNoEvents(
        FilterTypeMessage[getKeyByValue(FilterType, this.#filterModel.filter)]
      );
      return;
    }

    this.#renderInfo();
    this.#renderSort();
    this.#renderEvents(this.events);
  };
}
