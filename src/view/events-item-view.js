import { createElement } from '../render.js';
import { formatEventDate, durationEventTime } from '../utils.js';

/*
<li class="event__offer">
        <span class="event__offer-title">Book tickets</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">40</span>
      </li>
      <li class="event__offer">
        <span class="event__offer-title">Lunch in city</span>
          &plus;&euro;&nbsp;
        <span class="event__offer-price">30</span>
      </li>
*/

function createEventOffersTemplate(offers) {
  let offersTemplate = '';
  for (let i = 0; i < offers.length; i++) {
    offersTemplate += `<li class="event__offer">
                         <span class="event__offer-title">${offers[i].title}</span>
                           &plus;&euro;&nbsp;
                         <span class="event__offer-price">${offers[i].price}</span>
                       </li>`;
  }
  return offersTemplate;
}

function createEventsItemTemplate(event, eventInfo) {
  /*
id: 'a9e591d1-c01d-4211-a72c-f864b782322e',
    basePrice: 8128,
    dateFrom: '2024-06-13T08:02:07.164Z',
    dateTo: '2024-06-14T01:18:07.164Z',
    destination: '48fb0649-12c0-44c7-ad79-a02c72716d1c',
    isFavorite: false,
    offers: [
      'e5af71d8-4996-424e-9c52-b42b7a48a90b',
      'cf5d1a10-f72b-4651-a8cf-4af292bed982',
      '47fba2cf-9d93-4c4c-8e17-08e475348066',
      'f58c1d52-9123-4830-984c-45c8b562f447',
    ],
    type: 'flight',
*/
  const TIME_FORMAT = 'HH:mm';
  const DATE_FORMAT = 'MMM DD';
  const startDate = formatEventDate(event.dateFrom, DATE_FORMAT);
  const startTime = formatEventDate(event.dateFrom, TIME_FORMAT);
  const endTime = formatEventDate(event.dateTo, TIME_FORMAT);
  const { type, basePrice, isFavorite } = event;
  const { destination, offers } = eventInfo;
  const totalPrice =
    basePrice + offers.reduce((sum, offer) => sum + offer.price, 0);
  const offersTemplate = createEventOffersTemplate(offers);

  return `<li class="trip-events__item">
	<div class="event">
		<time class="event__date" datetime="2019-03-18">${startDate}</time>
		<div class="event__type">
			<img class="event__type-icon" width="42" height="42" src="./img/icons/${type}.png" alt="Event type icon">
		</div>
		<h3 class="event__title">${type} ${destination.name}</h3>
		<div class="event__schedule">
			<p class="event__time">
				<time class="event__start-time" datetime="2019-03-18T12:25">${startTime}</time>
				&mdash;
				<time class="event__end-time" datetime="2019-03-18T13:35">${endTime}</time>
			</p>
			<p class="event__duration">${durationEventTime(
        event.dateFrom,
        event.dateTo
      )}</p>
		</div>
		<p class="event__price">
			&euro;&nbsp;<span class="event__price-value">${totalPrice}</span>
		</p>
		<h4 class="visually-hidden">Offers:</h4>
		<ul class="event__selected-offers">
      ${offersTemplate}
    </ul>
		<button class="event__favorite-btn ${
      isFavorite ? 'event__favorite-btn--active' : ''
    }" type="button">
			<span class="visually-hidden">Add to favorite</span>
			<svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
				<path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
			</svg>
		</button>
		<button class="event__rollup-btn" type="button">
			<span class="visually-hidden">Open event</span>
		</button>
	</div>
</li>`;
}

export default class EventsItemView {
  constructor({ event, eventInfo }) {
    this.event = event;
    this.eventInfo = eventInfo;
  }

  getTemplate() {
    return createEventsItemTemplate(this.event, this.eventInfo);
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
