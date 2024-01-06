import { Component, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``
})
export class ByCountryPageComponent {

  public isLoading: boolean = false;
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public searchByCountry( buscar: string): void {
    this.isLoading = true;
    this.countriesService.searchCountry(buscar)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }


}
