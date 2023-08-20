import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Map, LngLat, Marker } from 'mapbox-gl';

interface MarkerAndColor {
  color: string;
  marker: Marker
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css'],
})
export class MarkersPageComponent implements AfterViewInit {

  @ViewChild('map')
  private mapRef?: ElementRef<HTMLDivElement>;
  private map?: Map;

  public zoom: number = 13;
  public markers: Array<MarkerAndColor> = [];
  public currentLngLat: LngLat = new LngLat(-79.89057384725469, -2.202029452027375);

  ngAfterViewInit(): void {
    if (!this.mapRef) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.mapRef.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y => (Math.random()*16|0).toString(16));
    const lngLat = this.map.getCenter();

    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true
     })
      .setLngLat(lngLat)
      .addTo(this.map!);

    this.markers.push({ color, marker });
  }

  deleteMarker(idx: number) {
    this.markers.at(idx)?.marker.remove();
    this.markers.splice(idx, 1);
  }

  flyTo(marker: Marker) {
    if (!this.map) return;

    this.map.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }
}
