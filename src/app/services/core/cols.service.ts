import {Injectable} from '@angular/core';
import {ColModel} from "@models/core";

@Injectable({
  providedIn: 'root'
})

export class ColsService {
  constructor() {
  }

  get catalogue(): ColModel[] {
    return [
      {field: 'name', header: 'Nombre'},
      {field: 'description', header: 'Descripción'},
    ];
  }
}
