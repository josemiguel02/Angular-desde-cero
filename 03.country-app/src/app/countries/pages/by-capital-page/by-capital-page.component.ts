import { Component } from '@angular/core';
import { CountriesService } from '@/countries/services/countries.service';
import { Country } from '@/countries/interfaces/country';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [],
})
export class ByCapitalPageComponent {
  public countries: Array<Country> = [];

  constructor(private countriesService: CountriesService) {}

  searchByCapital(term: string) {
    this.countriesService
      .searchCapital(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
