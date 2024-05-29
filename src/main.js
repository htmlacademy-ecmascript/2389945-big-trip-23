import EventsModel from './model/events-model.js';
import FilterModel from './model/filter-model.js';
import TripPresenter from './presenter/trip-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import EventsApiService from './events-api-service.js';

const AUTHORIZATION = 'Basic xS2d557gsdsgdf3478k';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const tripEventsElement = document.querySelector('.trip-events');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsFiltersElement = tripMainElement.querySelector(
  '.trip-controls__filters'
);
const tripMainNewEventButtonElement = tripMainElement.querySelector(
  '.trip-main__event-add-btn'
);

const eventsModel = new EventsModel({
  eventsApiService: new EventsApiService(END_POINT, AUTHORIZATION),
});
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter({
  mainContainer: tripMainElement,
  eventsContainer: tripEventsElement,
  eventsModel,
  filterModel,
  newEventButtonComponent: tripMainNewEventButtonElement,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripControlsFiltersElement,
  filterModel,
  eventsModel,
});

filterPresenter.init();
tripPresenter.init();
eventsModel.init();
