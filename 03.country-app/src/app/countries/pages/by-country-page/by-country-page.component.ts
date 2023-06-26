import { Component } from '@angular/core';
import { Country } from '@/countries/interfaces/country';
import { CountriesService } from '@/countries/services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [],
})
export class ByCountryPageComponent {
  public countries: Array<Country> = [];

  constructor(private countriesService: CountriesService) {}

  searchByCountry(term: string) {
    this.countriesService
      .searchCountry(term)
      .subscribe((countries) => (this.countries = countries));
  }
}
