import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterItemTemplate(filter, isChecked) {
  const { type, count } = filter;

  return `<div class="trip-filters__filter">
    <input
      type="radio"
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      name="trip-filter"
      value="${type}"
      ${isChecked ? 'checked' : ''}
      ${count === 0 ? 'disabled' : ''}
    />
    <label for="filter-${type}" class="trip-filters__filter-label">${type}</label
    ></div>`;
}

function createTripFilterTemplate(filterItems) {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createTripFilterItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

export default class TripFilterView extends AbstractView {
  #filters = null;

  constructor({ filters }) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createTripFilterTemplate(this.#filters);
  }
}
