import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchResponse, Gif } from 'gifs/interfaces/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  public gifList: Array<Gif> = [];
  private _tagsHistory: Array<string> = [];
  private GIPHY_URL_API: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'RKt51hq9bdvb67YhabAAkFiA3L9WUy9a';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagsHistory(): Array<string> {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.slice(0, 10);
    this.saveLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void {
    const history = localStorage.getItem('history');

    if (history) {
      this._tagsHistory = JSON.parse(history);
    }

    if (this._tagsHistory.length) {
      this.searchTag(this._tagsHistory[0]);
    }
  }

  searchTag(tag: string) {
    if (!tag.trim()) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .append('api_key', this.apiKey)
      .append('limit', 10)
      .append('q', tag.toLowerCase());

    this.http
      .get<SearchResponse>(`${this.GIPHY_URL_API}/search`, { params })
      .subscribe((res) => {
        this.gifList = res.data;
      });
  }
}
