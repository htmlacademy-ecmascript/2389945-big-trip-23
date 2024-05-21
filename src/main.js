import { RenderPosition, render } from './framework/render.js';
import { generateFilters } from './mock/filters.js';
import EventsModel from './model/events-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import TripFilterView from './view/trip-filter-view.js';
import TripInfoView from './view/trip-info-view.js';

const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const eventsModel = new EventsModel();

const tripPresenter = new TripPresenter({
  container: tripEventsElement,
  eventsModel,
});

const filters = generateFilters(eventsModel.events);

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new TripFilterView({ filters }), tripControlsFiltersElement);

tripPresenter.init();
