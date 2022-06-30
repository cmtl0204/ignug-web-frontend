import {Component, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuItem} from 'primeng/api';
import {BreadcrumbService} from '@services/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
  subscription: Subscription;
  items: MenuItem[] = [];

  constructor(public breadcrumbService: BreadcrumbService) {
    this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response as MenuItem[];
    });
  }
}
