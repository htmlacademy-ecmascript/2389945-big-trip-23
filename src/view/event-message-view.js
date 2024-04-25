import { createElement } from '../render.js';

function createEventEmptyTemplate(message) {
  return `<p class="trip-events__msg">${message}</p>`;
}

export default class EventEmptyView {
  constructor({ message }) {
    this.message = message;
  }

  getTemplate() {
    return createEventEmptyTemplate(this.message);
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
