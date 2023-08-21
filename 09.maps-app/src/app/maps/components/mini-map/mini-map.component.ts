import {
  Component,
  AfterViewInit,
  Input,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Map, Marker } from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'],
})
export class MiniMapComponent implements AfterViewInit {

  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  private mapRef?: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (!this.mapRef) throw 'Map Element not found!';
    if (!this.lngLat) throw 'LngLat cant be null!';

    const map = new Map({
      container: this.mapRef.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.lngLat,
      zoom: 15,
      interactive: false,
    });

    new Marker({
      color: 'crimson',
    })
      .setLngLat(this.lngLat)
      .addTo(map);
  }
}
