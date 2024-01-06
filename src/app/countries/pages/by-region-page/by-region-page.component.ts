import { Component, Output } from '@angular/core';

import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';
import { SearchBoxComponent } from '../../../shared/components/search-box/search-box.component';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  public isLoading: boolean = false;
  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public searchByregion( buscar: string): void {
    this.isLoading = true;
    this.countriesService.searchRegion(buscar)
    .subscribe(countries => {
      this.countries = countries;
      this.isLoading = false;
    });
  }




}
