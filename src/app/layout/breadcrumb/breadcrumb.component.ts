import {Component, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {BreadcrumbService, CoreService} from '@services/core';
import {AuthService} from "@services/auth";
import {Router} from "@angular/router";

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected subscription: Subscription;
  protected items: MenuItem[] = [];
  protected home: MenuItem;

  constructor(public breadcrumbService: BreadcrumbService,
              public coreService: CoreService,
              protected authService: AuthService,
              private router: Router) {
    this.subscription = breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response as MenuItem[];
    });
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }

  redirectProfile() {
    this.router.navigateByUrl('/profile');
  }
}
