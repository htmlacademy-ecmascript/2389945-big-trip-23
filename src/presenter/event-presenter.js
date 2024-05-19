import { EventMode } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #allDestinations = null;
  #allOffers = null;
  #mode = EventMode.VIEW;

  constructor({
    eventsListContainer,
    allDestinations,
    allOffers,
    onDataChange,
    onModeChange,
  }) {
    this.#eventsListContainer = eventsListContainer;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      allDestinations: this.#allDestinations,
      allOffers: this.#allOffers,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#eventsListContainer);
      return;
    }

    if (this.#mode === EventMode.VIEW) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === EventMode.EDIT) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  resetView() {
    if (this.#mode !== EventMode.VIEW) {
      this.#replaceFormToEvent();
    }
  }

  #replaceEventToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handleModeChange();
    this.#mode = EventMode.EDIT;
  }

  #replaceFormToEvent() {
    replace(this.#eventComponent, this.#eventEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = EventMode.VIEW;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#event);
      this.#replaceFormToEvent();
    }
  };

  #handleEditClick = () => {
    this.#replaceEventToForm();
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange({
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };

  #handleFormSubmit = () => {
    //this.#handleDataChange(event);
    this.#replaceFormToEvent();
  };

  #handleFormClose = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceFormToEvent();
  };
}
