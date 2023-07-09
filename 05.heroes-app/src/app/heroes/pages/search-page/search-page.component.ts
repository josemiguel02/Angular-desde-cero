import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, Subscription, debounceTime, switchMap } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { HeroesService } from '@/heroes/services/heroes.service';
import { Hero } from '@/heroes/interfaces/hero.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent implements OnInit, OnDestroy {
  public searchInput = new FormControl('');
  public heroes: Array<Hero> = [];
  public selectedHero?: Hero;
  private debouncer = new Subject<string>();
  private debouncerSubscription?: Subscription;

  constructor(private heroesService: HeroesService) {}

  ngOnInit(): void {
    this.debouncerSubscription = this.debouncer
      .pipe(
        debounceTime(500),
        switchMap(query => this.getSuggestions(query))
      )
      .subscribe(heroes => {
        this.heroes = heroes;
      });
  }

  ngOnDestroy(): void {
    this.debouncerSubscription?.unsubscribe();
  }

  getSuggestions(value: string) {
    return this.heroesService.getSuggestions(value);
  }

  onDebounce() {
    const value = this.searchInput.value;
    if (!value) return;

    this.debouncer.next(value);
  }

  onSelectedOption(e: MatAutocompleteSelectedEvent) {
    if (!e.option.value) {
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = e.option.value;

    this.searchInput.setValue(hero.superhero);
    this.selectedHero = hero;
  }
}
