import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private _tagsHistory: Array<string> = [];

  constructor() {}

  get tagsHistory(): Array<string> {
    return [...this._tagsHistory];
  }

  searchTag(tag: string) {
    this._tagsHistory.unshift(tag);
  }
}
