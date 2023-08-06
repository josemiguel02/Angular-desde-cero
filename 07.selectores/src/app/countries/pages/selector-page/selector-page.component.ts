import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap, filter } from 'rxjs';
import { CountriesService } from '@/countries/services/countries.service';
import { Region, SmallCountry } from '@/countries/interfaces/country.interfaces';

@Component({
  templateUrl: './selector-page.component.html',
})
export class SelectorPageComponent implements OnInit {
  public countriesByRegion: Array<SmallCountry> = [];
  public borders: Array<SmallCountry> = [];

  public myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private countriesService: CountriesService,
  ) {}

  ngOnInit(): void {
    this.onRegionChange();
    this.onCountryChange();
  }

  get regions(): Array<Region> {
    return this.countriesService.regions;
  }

  onRegionChange() {
    this.myForm.get('region')?.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')?.setValue('')),
        tap(() => this.borders = []),
        switchMap(region => this.countriesService.getCountriesByRegion(region)),
      )
      .subscribe(countries => {
        this.countriesByRegion = countries;
      });
  }

  onCountryChange() {
    this.myForm.get('country')?.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')?.setValue('')),
        filter((value: string) => !!value.trim()),
        switchMap(alphaCode => this.countriesService.getCountryByAlphaCode(alphaCode)),
        switchMap(country => this.countriesService.getCountryBordersByCodes(country.borders)),
      )
      .subscribe(countries => {
        this.borders = countries;
      });
  }

}
