import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PaginatorModel} from "@models/core";
import {Router} from "@angular/router";
import {AuthRoutesEnum} from "@shared/enums";

@Injectable({
  providedIn: 'root'
})

export class RoutesService {

  constructor(private router:Router) {
  }

  login(){
    this.router.navigateByUrl(AuthRoutesEnum.LOGIN);
  }

  profile(){
    this.router.navigateByUrl(AuthRoutesEnum.PROFILE);
  }
}
