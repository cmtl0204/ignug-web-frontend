import {Injectable} from '@angular/core';
import {ModelI} from "@models/core";


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  constructor() {
  }

  get model(): ModelI {
    return JSON.parse(String(localStorage.getItem('model')));
  }

  set model(value: ModelI) {
    localStorage.setItem('model', JSON.stringify(value));
  }
}
