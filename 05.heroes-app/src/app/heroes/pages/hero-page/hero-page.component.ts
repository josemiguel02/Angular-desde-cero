import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '@/heroes/services/heroes.service';
import { switchMap } from 'rxjs';
import { Hero } from '@/heroes/interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [],
})
export class HeroPageComponent implements OnInit {
  public hero?: Hero;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => {
        if (!hero) {
          this.router.navigateByUrl('heroes/list');
          return;
        }

        this.hero = hero;
      });
  }

  goBack() {
    this.router.navigateByUrl('heroes/list')
  }
}
