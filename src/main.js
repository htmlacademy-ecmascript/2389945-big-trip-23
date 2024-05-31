import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsApiService from './events-api-service.js';
import { Connection } from './const.js';

const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(
    Connection.END_POINT,
    Connection.AUTHORIZATION
  ),
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  mainContainer: tripMainElement,
  eventsContainer: tripEventsElement,
  eventsModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  eventsModel,
});

filterPresenter.init();
tripPresenter.init();
eventsModel.init();
