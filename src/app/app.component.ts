import {Component} from '@angular/core';
import {PrimeNGConfig} from 'primeng/api';
import {MenusHttpService} from "@services/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ignug-frontend';

  constructor(private primengConfig: PrimeNGConfig) {

  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
}
