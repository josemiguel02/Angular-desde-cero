import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Map } from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css'],
})
export class FullScreenPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('map')
  private mapRef?: ElementRef<HTMLDivElement>;
  private map?: Map;

  ngAfterViewInit(): void {
    if (!this.mapRef) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.mapRef.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }
}
