import AbstractView from '../framework/view/abstract-view.js';

const createEventsMessageTemplate = (message) =>
  `<p class="trip-events__msg">${message}</p>`;

export default class EventsMessageView extends AbstractView {
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createEventsMessageTemplate(this.#message);
  }
}
