import UiBlocker from '../framework/ui-blocker/ui-blocker.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import TripInfoView from '../view/trip-info-view.js';
import TripSortView from '../view/trip-sort-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import { filter } from '../utils/filter.js';
import { calcTotalPrice, getRoute } from '../utils/event.js';
import {
  FilterType,
  EventsMessage,
  filterTypeMessage,
  SortType,
  UpdateType,
  UserAction,
  TimeLimit,
} from '../const.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import {
  sortEventsByDay,
  sortEventsByPrice,
  sortEventsByTime,
} from '../utils/sort.js';

export default class TripPresenter {
  #eventsListComponent = new EventsListView();
  #mainContainer = null;
  #eventsContainer = null;
  #eventsModel = null;
  #filterModel = null;

  #destinations = null;
  #offers = null;

  #infoComponent = null;
  #sortComponent = null;
  #messageComponent = null;
  #newEventButtonComponent = null;

  #eventPresenters = new Map();
  #newEventPresenter = null;
  #currentSortType = SortType.DAY;
  #filterType = FilterType.EVERYTHING;
  #isLoading = true;
  #isError = false;
  #isNewEvent = false;

  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT,
  });

  constructor({
    mainContainer,
    eventsContainer,
    eventsModel,
    filterModel,
    newEventButtonComponent,
  }) {
    this.#mainContainer = mainContainer;
    this.#eventsContainer = eventsContainer;
    this.#eventsModel = eventsModel;
    this.#filterModel = filterModel;
    this.#newEventButtonComponent = newEventButtonComponent;

    this.#newEventPresenter = new NewEventPresenter({
      eventListContainer: this.#eventsListComponent.element,
      onDataChange: this.#handleViewAction,
      onDestroy: this.#handleNewEventFormClose,
    });

    this.#eventsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);

    this.#newEventButtonComponent.addEventListener(
      'click',
      this.#newEventButtonClickHandler
    );
  }

  get events() {
    this.#filterType = this.#filterModel.filter;
    const events = this.#eventsModel.events;
    let filteredEvents = filter[this.#filterType](events);

    filteredEvents = this.#sortEvents(this.#currentSortType, filteredEvents);
    return filteredEvents;
  }

  init = () => {
    this.#destinations = this.#eventsModel.destinations;
    this.#offers = this.#eventsModel.offers;
    this.#renderTrip();
  };

  createEvent = () => {
    this.#currentSortType = SortType.DAY;
    this.#filterModel.setFilter(FilterType.EVERYTHING);
    this.#newEventPresenter.init(this.#destinations, this.#offers);
  };

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

  #handleViewAction = async (actionType, updateType, update) => {
    this.#uiBlocker.block();
    const activeForm = UserAction.ADD_EVENT === actionType ? this.#newEventPresenter : this.#eventPresenters.get(update.id);
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        activeForm.setSaving();
        try {
          await this.#eventsModel.updateEvent(updateType, update);
        } catch (err) {
          activeForm.setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        activeForm.setSaving();
        try {
          await this.#eventsModel.addEvent(updateType, update);
        } catch (err) {
          activeForm.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        activeForm.setDeleting();
        try {
          await this.#eventsModel.deleteEvent(updateType, update);
        } catch (err) {
          activeForm.setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#messageComponent);
        this.init();
        break;
      case UpdateType.ERROR:
        this.#isError = true;
        remove(this.#messageComponent);
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearTrip();
    this.#renderTrip();
  };

  #renderInfo = (events) => {
    const route = getRoute(
      this.#sortEvents(SortType.DAY, [...events]),
      this.#eventsModel.destinations
    );
    this.#infoComponent = new TripInfoView({
      route: route.route,
      routeDates: route.routeDates,
      totalPrice: calcTotalPrice(events, this.#eventsModel.offers),
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

  #renderNoEvents = () => {
    let message = null;

    if (this.#isError) {
      this.#setNewButtonDisabled(true);
      message = EventsMessage.ERROR;
    }

    if (this.#isLoading && !message) {
      message = EventsMessage.LOADING;
    }

    if (this.events.length === 0 && !message) {
      message = filterTypeMessage[this.#filterModel.filter];
    }

    if (message) {
      if (!this.#isNewEvent) {
        this.#messageComponent = new EventsMessageView(message);
        render(
          this.#messageComponent,
          this.#eventsContainer,
          RenderPosition.AFTERBEGIN
        );
      }
      return true;
    }

    return false;
  };

  #renderEvent = (event) => {
    const eventPresenter = new EventPresenter({
      eventsListContainer: this.#eventsListComponent.element,
      destinations: this.#destinations,
      offers: this.#offers,
      onDataChange: this.#handleViewAction,
      onModeChange: this.#handleModeChange,
    });
    eventPresenter.init(event);
    this.#eventPresenters.set(event.id, eventPresenter);
  };

  #renderEvents = (events) => {
    events.forEach((event) => this.#renderEvent(event));
  };

  #clearTrip = ({ resetSortType = false } = {}) => {
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
  };

  #setNewButtonDisabled = (disabled) => {
    this.#newEventButtonComponent.disabled = disabled;
  };

  #newEventButtonClickHandler = () => {
    this.#isNewEvent = true;
    this.createEvent();
    this.#setNewButtonDisabled(true);
  };

  #handleNewEventFormClose = () => {
    this.#isNewEvent = false;
    this.#setNewButtonDisabled(false);
    this.#renderNoEvents();
  };

  #renderTrip = () => {
    render(this.#eventsListComponent, this.#eventsContainer);

    if (this.#renderNoEvents()) {
      return;
    }

    this.#renderInfo(this.#eventsModel.events);
    this.#renderSort();
    this.#renderEvents(this.events);
  };
}
