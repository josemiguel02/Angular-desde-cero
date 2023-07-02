import { Country } from '@/countries/interfaces/countries.interface';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: [],
})
export class CountryTableComponent {
  @Input()
  public countries: Array<Country> = [];
}
