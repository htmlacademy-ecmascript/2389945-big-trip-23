import EventPresenter from './presenter/event-presenter.js';
import { RenderPosition, render } from './render.js';
import EventFilterView from './view/event-filter-view.js';
import TripInfoView from './view/trip-info-view.js';

const siteMainElement = document.querySelector('.page-main');
const tripMainElement = document.querySelector('.trip-main');
const eventFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);

const eventPresenter = new EventPresenter({ eventContainer: siteMainElement });

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new EventFilterView(), eventFiltersElement);

eventPresenter.init();
