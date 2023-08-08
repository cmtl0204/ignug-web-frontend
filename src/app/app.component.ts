import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {BreadcrumbService, CoreService} from "@services/core";
import {BreadcrumbEnum, CoreMessageEnum} from "@shared/enums";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected readonly CoreMessageEnum = CoreMessageEnum;
  constructor(private primengConfig: PrimeNGConfig, public coreService: CoreService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{label: BreadcrumbEnum.HOME}]);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
