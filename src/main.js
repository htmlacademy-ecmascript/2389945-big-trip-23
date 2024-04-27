import EventsModel from './model/events-model.js';
import EventPresenter from './presenter/event-presenter.js';
import { RenderPosition, render } from './render.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoView from './view/trip-info-view.js';

const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const eventFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const eventsModel = new EventsModel();

const eventPresenter = new EventPresenter({
  container: tripEventsElement,
  eventsModel,
});

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new TripFiltersView(), eventFiltersElement);

eventPresenter.init();
