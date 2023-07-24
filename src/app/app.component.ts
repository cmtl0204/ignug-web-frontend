import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {BreadcrumbService, CoreService} from "@services/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ignug-frontend';

  constructor(private primengConfig: PrimeNGConfig, public coreService: CoreService, private breadcrumbService: BreadcrumbService) {
    this.breadcrumbService.setItems([{label: 'Home'}]);
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
