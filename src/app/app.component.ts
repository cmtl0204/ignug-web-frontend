import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {BreadcrumbService, CoreService} from "@services/core";
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private primengConfig: PrimeNGConfig, public coreService: CoreService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.HOME}]);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
