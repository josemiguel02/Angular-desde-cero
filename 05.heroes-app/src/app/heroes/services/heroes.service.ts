import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private BASE_URL = environments.BASE_URL;

  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.BASE_URL}/heroes`);
  }
}
