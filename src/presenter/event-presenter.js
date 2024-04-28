import { render } from '../render.js';
import EventEditPointView from '../view/event-edit-point-view.js';
import EventsItemView from '../view/events-item-view.js';
import EventsListView from '../view/events-list-view.js';
import TripSortView from '../view/trip-sort-view.js';

export default class EventPresenter {
  eventsListElement = new EventsListView();

  constructor({ container, eventsModel }) {
    this.container = container;
    this.eventsModel = eventsModel;
  }

  init() {
    this.tripEvents = [...this.eventsModel.getEvents()];
    this.tripEventsInfo = new Map([...this.eventsModel.getEventsInfo()]);

    console.log(this.tripEventsInfo);

    render(new TripSortView(), this.container);
    render(this.eventsListElement, this.container);
    render(new EventEditPointView(), this.eventsListElement.getElement());

    for (let i = 0; i < this.tripEvents.length; i++) {
      render(
        new EventsItemView({
          event: this.tripEvents[i],
          eventInfo: this.tripEventsInfo.get(this.tripEvents[i]),
        }),
        this.eventsListElement.getElement()
      );
    }
  }
}
