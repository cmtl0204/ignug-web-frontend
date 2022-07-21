import {Component} from '@angular/core';
import {CoreService} from "@services/core";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  constructor(private coreService: CoreService) {
  }

  loaded$ = this.coreService.loaded$;
}
