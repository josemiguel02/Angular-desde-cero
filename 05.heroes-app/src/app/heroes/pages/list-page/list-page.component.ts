import { Component, OnInit } from '@angular/core';
import { HeroesService } from '@/heroes/services/heroes.service';
import { Hero } from '@/heroes/interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public heroes: Array<Hero> = [];

  constructor(
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }
}
