import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Movie } from '../models/movie';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {

  private apiUrl = `${environment.apiUrl}`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) {}

  /** GET movies from the server */
  getMovies(term: string, skip: number): Observable<Movie[]> {
    /* const options = { params: new HttpParams({ fromString: `_term=&_skip=${ skip }&_limit=20` }) }; */
    return this.http.get<Movie[]>(`${this.apiUrl}/movies/?skip=${skip}${term ? `&term=${ term }` : ''}`)
      .pipe(
        tap(_ => console.log('fetched movies')),
        catchError(this.handleError<Movie[]>('getMovies', []))
      );
  }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: string): Observable<Movie> {
    const url = `${this.apiUrl}/movie/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => console.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      /* this.log(`${operation} failed: ${error.message}`); */

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
