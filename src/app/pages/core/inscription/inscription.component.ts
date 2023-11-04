import {Component} from '@angular/core';
import {BreadcrumbService} from "@services/core";
import {BreadcrumbEnum} from "@shared/enums";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {
  constructor(private readonly breadcrumbService: BreadcrumbService,) {
    this.breadcrumbService.setItems([
      {label: BreadcrumbEnum.FORM},
    ]);
  }
}
