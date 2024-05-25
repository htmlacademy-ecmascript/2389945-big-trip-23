import { EventMode } from '../const.js';
import { remove, render, replace } from '../framework/render.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';
import { UserAction, UpdateType } from '../const.js';

export default class EventPresenter {
  #eventsListContainer = null;
  #handleDataChange = null;
  #handleModeChange = null;

  #eventComponent = null;
  #eventEditComponent = null;

  #event = null;
  #destinations = null;
  #offers = null;
  #mode = EventMode.VIEW;

  constructor({
    eventsListContainer,
    destinations,
    offers,
    onDataChange,
    onModeChange,
  }) {
    this.#eventsListContainer = eventsListContainer;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
  }

  init(event) {
    this.#event = event;

    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    this.#eventComponent = new EventView({
      event: this.#event,
      destinations: this.#destinations,
      offers: this.#offers,
      onEditClick: this.#handleEditClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      event: this.#event,
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onFormDelete: this.#handleFormDelete,
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
      this.#mode = EventMode.VIEW;
      replace(this.#eventComponent, prevEventEditComponent);
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

  setSaving() {
    if (this.#mode === EventMode.EDIT) {
      this.#eventEditComponent.updateElement({
        isSaving: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === EventMode.EDIT) {
      this.#eventEditComponent.updateElement({
        isDeleting: true,
      });
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
    this.#handleDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, {
      ...this.#event,
      isFavorite: !this.#event.isFavorite,
    });
  };

  #handleFormSubmit = (update) => {
    this.#handleDataChange(UserAction.UPDATE_EVENT, UpdateType.MINOR, update);
  };

  #handleFormDelete = (event) => {
    this.#handleDataChange(UserAction.DELETE_EVENT, UpdateType.MINOR, event);
  };

  #handleFormClose = () => {
    this.#eventEditComponent.reset(this.#event);
    this.#replaceFormToEvent();
  };
}
