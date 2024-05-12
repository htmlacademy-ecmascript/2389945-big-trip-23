import { EVENTS_LIST_EMPTY_MESSAGE } from '../const.js';
import { render, replace } from '../framework/render.js';
import EventEditPointView from '../view/event-edit-point-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';
import EventsMessageView from '../view/events-message-view.js';
import TripSortView from '../view/trip-sort-view.js';

export default class EventPresenter {
  #eventsListElement = new EventsListView();
  #container = null;
  #eventsModel = null;
  #tripEvents = [];
  #tripEventsInfo = null;

  #currentEventComponent = null;

  constructor({ container, eventsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
  }

  init() {
    this.#eventsModel.eventsInfo = this.#eventsModel.events;
    this.#tripEvents = [...this.#eventsModel.events];
    this.#tripEventsInfo = new Map([...this.#eventsModel.eventsInfo]);

    this.#renderTrip();
  }

  #renderEvent(event) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToEvent();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };
    const eventComponent = new EventsItemView({
      event,
      eventInfo: this.#tripEventsInfo.get(event),
      allDestinations: this.#eventsModel.getAllDestinations(),
      availableOffers: this.#eventsModel.getOffersByType(event.type).offers,
      onEditClick: () => {
        replaceEventToForm();
        document.addEventListener('keydown', escKeyDownHandler);
        this.#currentEventComponent = eventComponent;
      },
    });

    const applyFormClose = () => {
      replaceFormToEvent();
      document.removeEventListener('keydown', escKeyDownHandler);
    };

    const eventEditComponent = new EventEditPointView({
      event,
      eventInfo: this.#tripEventsInfo.get(event),
      allDestinations: this.#eventsModel.getAllDestinations(),
      availableOffers: this.#eventsModel.getOffersByType(event.type).offers,
      onFormSubmit: () => {
        applyFormClose();
      },
      onFormClose: () => {
        applyFormClose();
      },
    });

    function replaceEventToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToEvent() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventsListElement.element);
  }

  #renderTrip() {
    if (this.#tripEvents.length === 0) {
      render(new EventsMessageView(EVENTS_LIST_EMPTY_MESSAGE), this.#container);
      return;
    }
    render(new TripSortView(), this.#container);
    render(this.#eventsListElement, this.#container);

    for (let i = 0; i < this.#tripEvents.length; i++) {
      this.#renderEvent(this.#tripEvents[i]);
    }
  }
}
