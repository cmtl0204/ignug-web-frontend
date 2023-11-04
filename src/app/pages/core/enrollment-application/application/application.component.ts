import {Component} from '@angular/core';
import {BreadcrumbService} from "@services/core";

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {

  constructor(private readonly breadcrumbService: BreadcrumbService) {
    breadcrumbService.setItems([{label: 'Solicitud'}]);
  }
}
