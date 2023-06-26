import { Country } from '@/countries/interfaces/country';
import { CountriesService } from '@/countries/services/countries.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [],
})
export class ByRegionPageComponent {
  public countries: Array<Country> = [];

  constructor(private countriesService: CountriesService) {}

  searchByRegion(region: string) {
    this.countriesService
      .searchRegion(region)
      .subscribe((countries) => (this.countries = countries));
  }
}
