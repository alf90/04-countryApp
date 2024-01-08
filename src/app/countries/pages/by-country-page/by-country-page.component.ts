import { Component, OnInit, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';


@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent implements OnInit {

  public isLoading: boolean = false;
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountries.countries;
    this.initialValue = this.countriesService.cacheStore.byCountries.term;
  }

  public searchByCountry( buscar: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(buscar)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }


}
