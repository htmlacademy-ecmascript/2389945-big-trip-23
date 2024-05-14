import { FilterType } from '../const.js';
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

  #eventComponent = null;
  #eventEditComponent = null;

  constructor({ container, eventsModel }) {
    this.#container = container;
    this.#eventsModel = eventsModel;
  }

  init = () => {
    this.#eventsModel.eventsInfo = this.#eventsModel.events;
    this.#tripEvents = [...this.#eventsModel.events];
    this.#tripEventsInfo = new Map([...this.#eventsModel.eventsInfo]);

    this.#renderTrip();
  };

  #renderEvent = (event) => {
    const eventInfo = this.#tripEventsInfo.get(event);
    const allDestinations = this.#eventsModel.getAllDestinations();
    const availableOffers = this.#eventsModel.getOffersByType(
      event.type
    ).offers;

    const eventEditComponent = new EventEditPointView({
      event,
      eventInfo,
      allDestinations: this.#eventsModel.getAllDestinations(),
      availableOffers: this.#eventsModel.getOffersByType(event.type).offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormSubmit,
    });

    const eventComponent = new EventsItemView({
      event,
      eventInfo,
      allDestinations,
      availableOffers,
      onEditClick: () => {
        this.#handleEditClick(eventComponent, eventEditComponent);
      },
    });

    render(eventComponent, this.#eventsListElement.element);
  };

  #replaceEventToForm = (eventComponent, eventEditComponent) => {
    if (this.#eventComponent && this.#eventEditComponent) {
      replace(this.#eventComponent, this.#eventEditComponent);
    }

    replace(eventEditComponent, eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  #replaceFormToEvent = (eventComponent, eventEditComponent) => {
    replace(eventComponent, eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);

    this.#eventComponent = null;
    this.#eventEditComponent = null;
  };

  #handleEditClick = (eventComponent, eventEditComponent) => {
    this.#replaceEventToForm(eventComponent, eventEditComponent);
    this.#eventComponent = eventComponent;
    this.#eventEditComponent = eventEditComponent;
  };

  #handleFormSubmit = () => {
    this.#replaceFormToEvent(this.#eventComponent, this.#eventEditComponent);
  };

  #renderTrip = () => {
    if (this.#tripEvents.length === 0) {
      render(new EventsMessageView(FilterType.EVERYTHING.message), this.#container);
      return;
    }
    render(new TripSortView(), this.#container);
    render(this.#eventsListElement, this.#container);

    this.#tripEvents.forEach((event) => {
      this.#renderEvent(event);
    });
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#replaceFormToEvent(this.#eventComponent, this.#eventEditComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };
}
