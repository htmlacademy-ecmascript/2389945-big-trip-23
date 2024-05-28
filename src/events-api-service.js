import ApiService from './framework/api-service.js';
import { Method } from './const.js';

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({ url: 'points' }).then(ApiService.parseResponse).catch(() => {
      throw new Error();
    });
  }

  get destinations () {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse).catch(() => {
      throw new Error();
    });
  }

  get offers () {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse).catch(() => {
      throw new Error();
    });
  }

  updateEvent = async (event) => {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  addEvent = async (event) => {
    const response = await this._load({
      url: 'points',
      method: Method.POST,
      body: JSON.stringify(this.#adaptToServer(event)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  };

  deleteEvent = async (event) => {
    const response = await this._load({
      url: `points/${event.id}`,
      method: Method.DELETE,
    });

    return response;
  };

  #adaptToServer = (event) => {
    const adaptedEvent = {
      ...event,
      ['base_price']: event.basePrice,
      ['date_from']: event.dateFrom,
      ['date_to']: event.dateTo,
      ['is_favorite']: event.isFavorite,
    };

    delete adaptedEvent.basePrice;
    delete adaptedEvent.dateFrom;
    delete adaptedEvent.dateTo;
    delete adaptedEvent.isFavorite;

    return adaptedEvent;
  };
}
