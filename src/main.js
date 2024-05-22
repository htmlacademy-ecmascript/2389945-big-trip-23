import { RenderPosition, render } from './framework/render.js';
import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoView from './view/trip-info-view.js';

const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const tripMainNewEventButtonElement = tripMainElement.querySelector(
  '.trip-main__event-add-btn'
);
tripMainNewEventButtonElement.addEventListener(
  'click',
  handleNewEventButtonClick
);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  container: tripEventsElement,
  eventsModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  eventsModel,
});

function handleNewEventFormClose() {
  tripMainNewEventButtonElement.disabled = false;
}

function handleNewEventButtonClick() {
  tripPresenter.createEvent();
  tripMainNewEventButtonElement.disabled = true;
}

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);

filterPresenter.init();
tripPresenter.init();
