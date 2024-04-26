import { render } from '../render.js';
import EventEditPointView from '../view/event-edit-point-view.js';
import EventListView from '../view/event-list-view.js';
import EventSortView from '../view/event-sort-view.js';
import EventView from '../view/event-view.js';

export default class EventPresenter {
  constructor({ eventContainer }) {
    this.eventContainer = eventContainer;
  }

  eventListContainer = new EventListView();

  init() {
    const tripEventsElement = this.eventContainer.querySelector('.trip-events');
    render(new EventSortView(), tripEventsElement);
    render(this.eventListContainer, tripEventsElement);
    render(new EventEditPointView(), this.eventListContainer.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventListContainer.getElement());
    }
  }
}
