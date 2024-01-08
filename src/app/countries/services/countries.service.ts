import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region-type';

@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital:   { term:   '', countries: [] },
    byCountries: { term:   '', countries: [] },
    byRegion:    { region: '', countries: [] }
  }

  constructor(private http: HttpClient) {
    this.getLocalStorage();
  }

  private setLocalStorage() {
    localStorage.setItem('cacheStorage', JSON.stringify(this.cacheStore))
  }

  private getLocalStorage() {
    if(!localStorage.getItem('cacheStorage')) return;
    this.cacheStore = JSON.parse(localStorage.getItem('cacheStorage')!)
  }

  public searchCapital( term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.searchQry(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term, countries}),
      tap( () => this.setLocalStorage())
    )
    ;
  }

  public searchCountry( term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.searchQry(url)    .pipe(
      tap( countries => this.cacheStore.byCountries = {term, countries}),
      tap( () => this.setLocalStorage())
    )
    ;
  }

  public searchRegion( term: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.searchQry(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region: term, countries}),
      tap( () => this.setLocalStorage())
    )
    ;
  }

  public searchCountryByAlphaCode( term: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${term}`;
    return this.http.get<Country[]>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null),
      catchError( () => of(null))
    );

  }
  private searchQry (url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url)
    .pipe(
      catchError( () => of([])),
      //delay(2000)
    );
  }
}
