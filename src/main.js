import EventsModel from './model/events-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import { RenderPosition, render } from './render.js';
import EventFilterView from './view/event-filter-view.js';
import TripInfoView from './view/trip-info-view.js';

const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const eventFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const eventsModel = new EventsModel();

const tripPresenter = new TripPresenter({
  tripContainer: siteMainElement,
  eventsModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new EventFilterView(), eventFiltersElement);

tripPresenter.init();
