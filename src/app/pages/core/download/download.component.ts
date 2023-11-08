import { Component } from '@angular/core';
import { MenuItem, PrimeIcons } from "primeng/api";

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss']
})
export class DownloadComponent {
  protected readonly PrimeIcons = PrimeIcons;
}
