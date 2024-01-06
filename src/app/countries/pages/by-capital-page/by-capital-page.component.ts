import { Component, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  public isLoading: boolean = false;
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public searchByCapital( buscar: string): void {
    this.isLoading = true;
    this.countriesService.searchCapital(buscar)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }

}
