import he from 'he';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { DateTimeSettings, EventSettings } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { capitalizeFirstLetter, formatDate } from '../utils/common.js';
import { getDestinationById, getOfferById } from '../utils/event.js';
import { UserAction } from '../const.js';

const NEW_EVENT = {
  id: '',
  basePrice: 0,
  dateFrom: '',
  dateTo: '',
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'flight',
};

const createEventDestinstionsTemplate = (destinations) => {
  let destinationsTemplate = '';
  for (let i = 0; i < destinations.length; i++) {
    destinationsTemplate += `<option value="${destinations[i].name}"></option>`;
  }
  return destinationsTemplate;
};

const createEventOffersTemplate = (availableOffers, selectedOffers) => {
  let offersTemplate = '';
  availableOffers.forEach((offer) => {
    offersTemplate += `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox
        visually-hidden" id="${offer.id}"
        type="checkbox" name="${he.encode(offer.title)}"
        ${selectedOffers.includes(offer) ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">
            ${offer.title}
          </span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">
            ${offer.price}
          </span>
        </label>
      </div>`;
  });

  if (offersTemplate) {
    offersTemplate = `
      <section class="event__section event__section--offers">
			  <h3 class="event__section-title event__section-title--offers">
          Offers
        </h3>
				<div class="event__available-offers">
          ${offersTemplate}
        </div>
			</section>`;
  }
  return offersTemplate;
};

const createEventPicturesTemplate = (description, pictures) => {
  if (!pictures.length) {
    return '';
  }
  let picturesTemplate = '';

  pictures.forEach((picture) => {
    picturesTemplate += `
      <img class="event__photo" src="${picture.src}" alt="Event photo">`;
  });

  if (picturesTemplate) {
    picturesTemplate = `
      <div class="event__photos-container">
		    <div class="event__photos-tape">
          ${picturesTemplate}
        </div>
		  </div>`;
  }

  if (description) {
    picturesTemplate = `
      <p class="event__destination-description">
        ${description}
      </p>${picturesTemplate}`;
  }

  if (picturesTemplate) {
    picturesTemplate = `
      <section class="event__section event__section--destination">
		    <h3 class="event__section-title
        event__section-title--destination">
          Destination
        </h3>${picturesTemplate}
	    </section>`;
  }

  return picturesTemplate;
};

const createEventDetailsTemplate = (
  availableOffers,
  selectedOffers,
  destinationPoint
) => {
  let detailsTemplate = '';
  detailsTemplate = createEventOffersTemplate(availableOffers, selectedOffers);
  if (destinationPoint) {
    detailsTemplate += createEventPicturesTemplate(
      destinationPoint.description,
      destinationPoint.pictures
    );
  }
  return detailsTemplate
    ? `<section class="event__details">${detailsTemplate}</section>`
    : '';
};

const createEventTypesTemplate = (offers, eventType) => {
  let typesTemplate = '';
  offers.forEach((offer) => {
    typesTemplate += `
      <div class="event__type-item">
        <input
          id="event-type-${offer.type}-1"
          class="event__type-input visually-hidden"
          type="radio"
          name="event-type"
          value="${he.encode(offer.type)}"
          ${offer.type === eventType ? 'checked' : ''}>
        <label class="event__type-label event__type-label--${offer.type}"
          for="event-type-${offer.type}-1">
          ${capitalizeFirstLetter(offer.type)}
        </label>
      </div>`;
  });

  return typesTemplate;
};

const createEventEditTemplate = (
  event,
  allDestinations,
  allOffers,
  editMode
) => {
  const { type, destination, basePrice, dateFrom, dateTo } = event;

  const destinationPoint = getDestinationById(allDestinations, destination);
  const selectedOffers = event.offers.map((offer) =>
    getOfferById(allOffers, event.type, offer)
  );
  const availableOffers = allOffers.find((item) => item.type === type).offers;

  const startDate = formatDate(dateFrom, DateTimeSettings.EDIT_DATE_FORMAT);
  const endDate = formatDate(dateTo, DateTimeSettings.EDIT_DATE_FORMAT);

  const totalPrice = basePrice;
  const typesTemplate = createEventTypesTemplate(allOffers, type);
  const destinationsTemplate = createEventDestinstionsTemplate(allDestinations);
  const detailsTemplate = createEventDetailsTemplate(
    availableOffers,
    selectedOffers,
    destinationPoint
  );

  return `
    <li class="trip-events__item">
	    <form class="event event--edit" action="#" method="post">
	      <header class="event__header">
		    <div class="event__type-wrapper">
			    <label class="event__type event__type-btn" for="event-type-toggle-1">
				    <span class="visually-hidden">Choose event type</span>
				    <img class="event__type-icon" width="17" height="17" src="./img/icons/${type}.png" alt="Event type icon">
			    </label>
			    <input class="event__type-toggle visually-hidden" id="event-type-toggle-1" type="checkbox">
			    <div class="event__type-list">
				    <fieldset class="event__type-group">
					    <legend class="visually-hidden">Event type</legend>
              ${typesTemplate}
				    </fieldset>
			    </div>
		    </div>

		    <div class="event__field-group event__field-group--destination">
			    <label class="event__label event__type-output" for="event-destination-1">
				    ${type}
			    </label>
			    <input class="event__input event__input--destination" id="event-destination-1" type="text" name="event-destination" value="
          ${he.encode(destinationPoint?.name || '')}" list="destination-list-1">
			    <datalist id="destination-list-1">
				    ${destinationsTemplate}
			    </datalist>
		    </div>

		    <div class="event__field-group event__field-group--time">
			    <label class="visually-hidden" for="event-start-time-1">From</label>
			    <input class="event__input event__input--time"                        id="event-start-time-1" type="text"
          name="event-start-time" value="
          ${he.encode(startDate)}">
			      &mdash;
			    <label class="visually-hidden" for="event-end-time-1">To</label>
			    <input class="event__input event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="
          ${he.encode(endDate)}">
		    </div>

		    <div class="event__field-group event__field-group--price">
			    <label class="event__label" for="event-price-1">
				    <span class="visually-hidden">Price</span>
				    &euro;
			    </label>
			    <input class="event__input event__input--price" id="event-price-1" type="text" name="event-price"
          value="${he.encode(String(totalPrice))}">
		    </div>

		    <button class="event__save-btn btn btn--blue" type="submit">Save</button>
		    <button class="event__reset-btn" type="reset">
        ${editMode === UserAction.UPDATE_EVENT ? 'Delete' : 'Cancel'}</button>
		    <button class="event__rollup-btn" type="button">
			    <span class="visually-hidden">Open event</span>
		    </button>
	      </header>
		    ${detailsTemplate}
      </form>
    </li>`;
};

export default class EventEditView extends AbstractStatefulView {
  #allDestinations = null;
  #allOffers = null;

  #handleFormSubmit = null;
  #handleFormDelete = null;
  #handleFormClose = null;

  #datepickerFrom = null;
  #datepickerTo = null;

  constructor({
    event = NEW_EVENT,
    allDestinations,
    allOffers,
    onFormSubmit,
    onFormDelete,
    onFormClose,
  }) {
    super();
    this._setState(EventEditView.parseEventToState(event));
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleFormDelete = onFormDelete;
    this.#handleFormClose = onFormClose;
    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(
      this._state,
      this.#allDestinations,
      this.#allOffers,
      this.editMode
    );
  }

  get editMode() {
    return this._state.id ? UserAction.UPDATE_EVENT : UserAction.ADD_EVENT;
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerFrom) {
      this.#datepickerFrom.destroy();
      this.#datepickerFrom = null;
    }

    if (this.#datepickerTo) {
      this.#datepickerTo.destroy();
      this.#datepickerTo = null;
    }
  }

  _restoreHandlers() {
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('.event__reset-btn')
      .addEventListener('click', this.#formDeleteHandler);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formCloseHandler);
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
    this.element
      .querySelector('.event__input--price')
      .addEventListener('keypress', this.#priceKeypressHandler);

    if (this.element.querySelector('.event__section--offers')) {
      this.element
        .querySelector('.event__section--offers')
        .addEventListener('change', this.#offerChangeHandler);
    }

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  reset = (event) => {
    this.updateElement(EventEditView.parseEventToState(event));
  };

  #setDatepickerFrom = () => {
    this.#datepickerFrom = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateFrom,
        enableTime: true,
        ['time_24hr']: true,
        onChange: this.#dateFromCloseHandler,
      }
    );
  };

  #setDatepickerTo = () => {
    this.#datepickerTo = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        defaultDate: this._state.dateTo,
        minDate: this.#datepickerFrom.selectedDates[0],
        enableTime: true,
        ['time_24hr']: true,
        onChange: this.#dateToCloseHandler,
      }
    );
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EventEditView.parseStateToEvent(this._state));
  };

  #formDeleteHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormDelete(EventEditView.parseStateToEvent(this._state));
  };

  #formCloseHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormClose();
  };

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName === 'INPUT') {
      this.updateElement({
        type: evt.target.value,
        offers: [],
      });
    }
  };

  #destinationChangeHandler = (evt) => {
    const name = evt.target.value;
    const newDestination = this.#allDestinations.find(
      (destination) => destination.name === name
    );

    if (!newDestination) {
      return;
    }

    this.updateElement({
      destination: newDestination.id,
    });
  };

  #priceKeypressHandler = (evt) => {
    if (!EventSettings.PRICE_PATTERN.test(evt.key)) {
      evt.preventDefault();
    }
  };

  #priceChangeHandler = (evt) => {
    const newBasePrice = Number(evt.target.value);

    if (newBasePrice) {
      this._setState({
        basePrice: newBasePrice,
      });
    }
  };

  #offerChangeHandler = (evt) => {
    evt.preventDefault();
    const availableOffers = this.element
      .querySelector('.event__available-offers')
      .querySelectorAll('input');
    const selectedOffers = [];

    for (const availableoffer of availableOffers) {
      if (availableoffer.checked) {
        selectedOffers.push(availableoffer.id);
      }
    }

    this._setState({ offers: selectedOffers });
  };

  #dateFromCloseHandler = ([userDate]) => {
    this._setState({ dateFrom: userDate });
  };

  #dateToCloseHandler = ([userDate]) => {
    this._setState({ dateTo: userDate });
  };

  static parseEventToState = (event) => ({ ...event });

  static parseStateToEvent = (state) => {
    const event = { ...state };
    return event;
  };
}
