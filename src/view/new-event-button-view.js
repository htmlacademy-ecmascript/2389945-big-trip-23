import AbstractView from '../framework/view/abstract-view.js';

export default class NewEventButtonView extends AbstractView {
  #container = null;
  #eventNewButtonElement = null;
  #handleButtonClick = null;

  constructor({ container, onButtonClick }) {
    super();
    this.#container = container;
    this.#handleButtonClick = onButtonClick;

    this.#eventNewButtonElement = this.#container.querySelector(
      '.trip-main__event-add-btn'
    );
    this.#eventNewButtonElement.addEventListener(
      'click',
      this.#buttonClickHandler
    );
  }

  enable = () => {
    this.#eventNewButtonElement.disabled = false;
  };

  disable = () => {
    this.#eventNewButtonElement.disabled = true;
  };

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };
}
