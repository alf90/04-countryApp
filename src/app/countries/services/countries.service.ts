import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';
@Injectable({providedIn: 'root'})
export class CountriesService {
  private apiUrl: string = 'https://restcountries.com/v3.1';
  constructor(private http: HttpClient) { }
  public searchCapital( term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.searchQry(url);
  }
  public searchCountry( term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.searchQry(url);
  }
  public searchRegion( term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${term}`;
    return this.searchQry(url);
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
