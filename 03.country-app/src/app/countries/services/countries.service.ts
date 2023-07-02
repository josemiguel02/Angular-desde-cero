import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country, Region } from '../interfaces/countries.interface';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private URL_API = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountries: { term: '', countries: [] },
    byRegion: { region: undefined, countries: [] },
  };

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
      .pipe(
        catchError(() => of([]))
      );
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    return this.http.get<Country[]>(`${this.URL_API}/alpha/${code}`)
      .pipe(
        map((countries) => (countries.length ? countries[0] : null)),
        catchError(() => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    return this.
      getCountriesRequest(`${this.URL_API}/capital/${term}`)
      .pipe(
        tap(countries => {
          this.cacheStore.byCapital = { term, countries };
        }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    return this
      .getCountriesRequest(`${this.URL_API}/name/${term}`)
      .pipe(
        tap(countries => {
          this.cacheStore.byCountries = { term, countries };
        }),
        tap(() => this.saveToLocalStorage()),
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    return this.
      getCountriesRequest(`${this.URL_API}/region/${region}`)
      .pipe(
        tap(countries => {
          this.cacheStore.byRegion = { region, countries };
        }),
        tap(() => this.saveToLocalStorage()),
      );
  }
}
