import { Component, OnInit, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';


@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent implements OnInit {

  public isLoading: boolean = false;
  public countries: Country[] = [];
  public initialValue: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;
  }

  public searchByCapital( buscar: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(buscar)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
