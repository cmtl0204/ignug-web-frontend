import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {LatLng, Map, marker, tileLayer} from "leaflet";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Output() latitudeOut: EventEmitter<number> = new EventEmitter<number>();
  @Output() longitudeOut: EventEmitter<number> = new EventEmitter<number>();
  @Input() latitudeIn: number = 0;
  @Input() longitudeIn: number = 0;

  ngAfterViewInit() {
    const myMap = new Map('map').setView([this.latitudeIn, this.longitudeIn], 14);

    // tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {}).addTo(myMap);
    tileLayer.wms('http://ows.mundialis.de/services/service?', {
      layers: 'OSM-WMS',
      format: 'image/png',
      transparent: true,
      attribution: ''
    }).addTo(myMap);

    let markerItem = marker([this.latitudeIn, this.longitudeIn]).addTo(myMap).bindPopup('Mi Ubicación');

    myMap.on('click', (e: {
      latlng: LatLng
    }) => {
      myMap.removeLayer(markerItem);
      markerItem = marker([e.latlng.lat, e.latlng.lng]).addTo(myMap).bindPopup('Mi Ubicación');
      this.latitudeOut.emit(e.latlng.lat);
      this.longitudeOut.emit(e.latlng.lng);
    });
  }
}
