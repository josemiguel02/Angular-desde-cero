import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private BASE_URL = environments.BASE_URL;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.BASE_URL}/heroes`);
  }

  getHeroById(id: string): Observable<Hero | undefined> {
    return this.http
      .get<Hero>(`${this.BASE_URL}/heroes/${id}`)
      .pipe(catchError(() => of(undefined)));
  }

  getSuggestions(query: string, limit: number = 5): Observable<Hero[]> {
    const params = new HttpParams()
      .append('q', query.toLowerCase())
      .append('_limit', limit);

    return this.http.get<Hero[]>(`${this.BASE_URL}/heroes`, { params });
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.BASE_URL}/heroes`, hero);
  }

  updateHero(hero: Hero): Observable<Hero> {
    if (!hero.id) {
      throw new Error('Hero id is required');
    }

    return this.http.patch<Hero>(`${this.BASE_URL}/heroes/${hero.id}`, hero);
  }

  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete(`${this.BASE_URL}/heroes/${id}`)
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
}
