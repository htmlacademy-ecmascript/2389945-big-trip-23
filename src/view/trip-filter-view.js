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
  //console.log(filterItems);
  const filterItemsTemplate = filterItems
    .map((filter, index) => createTripFilterItemTemplate(filter, index === 0))
    .join('');

  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
}

/*
const createTripFiltersTemplate = (filters) => {
  console.log(filters);
  return `<form class="trip-filters" action="#" method="get">
		<div class="trip-filters__filter">
			<input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
			<label class="trip-filters__filter-label" for="filter-everything">Everything</label>
		</div>

		<div class="trip-filters__filter">
			<input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">
			<label class="trip-filters__filter-label" for="filter-future">Future</label>
		</div>

		<div class="trip-filters__filter">
			<input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">
			<label class="trip-filters__filter-label" for="filter-present">Present</label>
		</div>

		<div class="trip-filters__filter">
			<input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past">
			<label class="trip-filters__filter-label" for="filter-past">Past</label>
		</div>

		<button class="visually-hidden" type="submit">Accept filter</button>
	</form>`;
};
*/

export default class TripFilterView extends AbstractView {
  #filter = null;

  constructor({ filter }) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createTripFilterTemplate(this.#filter);
  }
}
