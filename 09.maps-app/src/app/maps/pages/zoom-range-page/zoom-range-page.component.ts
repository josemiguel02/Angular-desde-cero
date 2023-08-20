import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map, LngLat } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.css'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  private mapRef?: ElementRef<HTMLDivElement>;
  private map?: Map;

  public zoom: number = 10;
  public currentLngLat: LngLat = new LngLat(-79.89057384725469, -2.202029452027375);

  ngAfterViewInit(): void {
    if (!this.mapRef) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.mapRef.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
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

    this.map.on('move', () => {
      this.currentLngLat = this.map!.getCenter();
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
