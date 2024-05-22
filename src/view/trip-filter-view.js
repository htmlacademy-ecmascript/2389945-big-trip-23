import AbstractView from '../framework/view/abstract-view.js';

function createTripFilterItemTemplate(filter, currentFilterType) {
  const { type, count } = filter;

  return `
    <div class="trip-filters__filter">
      <input
      type="radio"
      id="filter-${type}"
      class="trip-filters__filter-input  visually-hidden"
      name="trip-filter"
      value="${type}"
      ${type === currentFilterType ? 'checked' : ''}
      ${!count ? 'disabled' : ''}
      />
      <label for="filter-${type}" class="trip-filters__filter-label">
        ${type}
      </label
    ></div>`;
}

function createTripFilterTemplate(filter, currentFilterType) {
  const filterItemsTemplate = filter
    .map((filterItem) =>
      createTripFilterItemTemplate(filterItem, currentFilterType)
    )
    .join('');

  return `
    <form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">
        Accept filter
      </button>
    </form>`;
}

export default class TripFilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTripFilterTemplate(this.#filters, this.#currentFilter);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this.#handleFilterTypeChange(evt.target.value);
  };
}
