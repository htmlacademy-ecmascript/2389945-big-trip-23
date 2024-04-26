import { render } from '../render.js';
import EventEditPointView from '../view/event-edit-point-view.js';
import EventListView from '../view/event-list-view.js';
import EventSortView from '../view/event-sort-view.js';
import EventView from '../view/event-view.js';

export default class TripPresenter {
  constructor({ tripContainer, eventsModel }) {
    this.tripContainer = tripContainer;
    this.eventsModel = eventsModel;
  }

  eventListContainer = new EventListView();

  init() {
    this.tripEvents = [...this.eventsModel.getEvents()];
    console.log(this.tripEvents);

    const tripEventsElement = this.tripContainer.querySelector('.trip-events');
    render(new EventSortView(), tripEventsElement);
    render(this.eventListContainer, tripEventsElement);
    render(new EventEditPointView(), this.eventListContainer.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(
        new EventView({ event: this.tripEvents[i] }),
        this.eventListContainer.getElement()
      );
    }
  }
}
