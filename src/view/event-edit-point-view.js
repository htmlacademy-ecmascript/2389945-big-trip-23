import { Event } from '../const.js';
import { createElement } from '../render.js';
import { calcTotalPrice, formatEventDate } from '../utils.js';

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

const NEW_EVENT_INFO = {
  destination: { name: '', description: '' },
  selectedOffers: [],
};

const createDestinstionsTemplate = (destinations) => {
  let destinationsTemplate = '';
  for (let i = 0; i < destinations.length; i++) {
    destinationsTemplate += `<option value="${destinations[i].name}"></option>`;
  }
  return destinationsTemplate;
};

const createEventOffersTemplate = (availableOffers, selectedOffers) => {
  let offersTemplate = '';
  for (let i = 0; i < availableOffers.length; i++) {
    offersTemplate += `<div class="event__offer-selector">
    <input class="event__offer-checkbox  visually-hidden" id="${
  availableOffers[i].id
}" type="checkbox" name="${availableOffers[i].title}" ${
  selectedOffers.includes(availableOffers[i]) ? 'checked' : ''
}>
    <label class="event__offer-label" for="${availableOffers[i].id}">
      <span class="event__offer-title">${availableOffers[i].title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${availableOffers[i].price}</span>
    </label>
  </div>`;
  }
  if (offersTemplate) {
    offersTemplate = `<section class="event__section  event__section--offers">
												<h3 class="event__section-title  event__section-title--offers">Offers</h3>
												<div class="event__available-offers">${offersTemplate}</div>
											</section>`;
  }
  return offersTemplate;
};

const createEventPicturesTemplate = (description, pictures) => {
  if (pictures.length === 0) {
    return '';
  }
  let picturesTemplate = '';
  for (let i = 0; i < pictures.length; i++) {
    picturesTemplate += `<img class="event__photo" src="${pictures[i].src}" alt="Event photo">`;
  }

  if (picturesTemplate) {
    picturesTemplate = `<div class="event__photos-container">
		<div class="event__photos-tape">${picturesTemplate}</div>
		</div>`;
  }

  if (description) {
    picturesTemplate = `<p class="event__destination-description">${description}</p>${picturesTemplate}`;
  }

  if (picturesTemplate) {
    picturesTemplate = `	<section class="event__section  event__section--destination">
		<h3 class="event__section-title  event__section-title--destination">Destination</h3>
		${picturesTemplate}
	</section>`;
  }

  return picturesTemplate;
};

const createEventEditPointTemplate = (
  event,
  eventInfo,
  allDestinations,
  availableOffers
) => {
  const { type, basePrice, dateFrom, dateTo } = event;
  const { destination, selectedOffers } = eventInfo;

  const startDate = formatEventDate(dateFrom, Event.EDIT_DATE_FORMAT);
  const endDate = formatEventDate(dateTo, Event.EDIT_DATE_FORMAT);

  const totalPrice = calcTotalPrice(basePrice, selectedOffers);
  const offersTemplate = createEventOffersTemplate(
    availableOffers,
    selectedOffers
  );
  const destinationsTemplate = createDestinstionsTemplate(allDestinations);
  const picturesTemplate = createEventPicturesTemplate(
    destination.description,
    destination.pictures
  );

  return `<li class="trip-events__item">
	<form class="event event--edit" action="#" method="post">
	<header class="event__header">
		<div class="event__type-wrapper">
			<label class="event__type  event__type-btn" for="event-type-toggle-1">
				<span class="visually-hidden">Choose event type</span>
				<img class="event__type-icon" width="17" height="17" src="./img/icons/${type}.png" alt="Event type icon">
			</label>
			<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

			<div class="event__type-list">
				<fieldset class="event__type-group">
					<legend class="visually-hidden">Event type</legend>

					<div class="event__type-item">
						<input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
						<label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
						<label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
						<label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
						<label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
						<label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
						<label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
						<label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
						<label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
					</div>

					<div class="event__type-item">
						<input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
						<label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
					</div>
				</fieldset>
			</div>
		</div>

		<div class="event__field-group  event__field-group--destination">
			<label class="event__label  event__type-output" for="event-destination-1">
				${type}
			</label>
			<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination.name}" list="destination-list-1">
			<datalist id="destination-list-1">
				${destinationsTemplate}
			</datalist>
		</div>

		<div class="event__field-group  event__field-group--time">
			<label class="visually-hidden" for="event-start-time-1">From</label>
			<input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
			&mdash;
			<label class="visually-hidden" for="event-end-time-1">To</label>
			<input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
		</div>

		<div class="event__field-group  event__field-group--price">
			<label class="event__label" for="event-price-1">
				<span class="visually-hidden">Price</span>
				&euro;
			</label>
			<input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${totalPrice}">
		</div>

		<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
		<button class="event__reset-btn" type="reset">Delete</button>
		<button class="event__rollup-btn" type="button">
			<span class="visually-hidden">Open event</span>
		</button>
	</header>
	<section class="event__details">
      ${offersTemplate}
			${picturesTemplate}
	</section>
</form>
</li>`;
};
export default class EventEditPointView {
  constructor({
    event = NEW_EVENT,
    eventInfo = NEW_EVENT_INFO,
    allDestinations,
    availableOffers,
  }) {
    this.event = event;
    this.eventInfo = eventInfo;
    this.allDestinations = allDestinations;
    this.availableOffers = availableOffers;
  }

  getTemplate() {
    return createEventEditPointTemplate(
      this.event,
      this.eventInfo,
      this.allDestinations,
      this.availableOffers
    );
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
