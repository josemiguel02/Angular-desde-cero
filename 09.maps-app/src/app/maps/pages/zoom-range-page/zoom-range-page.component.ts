import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit {

  @ViewChild('map')
  private mapRef?: ElementRef<HTMLDivElement>;
  private map?: Map;

  public zoom: number = 10;

  ngAfterViewInit(): void {
    if (!this.mapRef) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.mapRef.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  private mapListener() {
    if (!this.map) return;

    this.map.on('zoom', e => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', e => {
      if (this.map!.getZoom() <= 18) return;
      this.map!.zoomTo(18);
    });
  }

  zoomIn() {
    this.map?.zoomIn();
  }

  zoomOut() {
    this.map?.zoomOut();
  }

  zoomChange(value: number) {
    this.zoom = value;
    this.map?.zoomTo(value);
  }
}
