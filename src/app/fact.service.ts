import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Fact } from './Fact';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class FactService {

  private FactsUrl = 'api/Facts';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET Facts from the server */
  getFacts (): Observable<Fact[]> {
    return this.http.get<Fact[]>(this.FactsUrl)
      .pipe(
        tap(Facts => this.log(`fetched Facts`)),
        catchError(this.handleError('getFacts', []))
      );
  }

  /** GET Fact by id. Return `undefined` when id not found */
  getFactNo404<Data>(id: number): Observable<Fact> {
    const url = `${this.FactsUrl}/?id=${id}`;
    return this.http.get<Fact[]>(url)
      .pipe(
        map(Facts => Facts[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} Fact id=${id}`);
        }),
        catchError(this.handleError<Fact>(`getFact id=${id}`))
      );
  }

  /** GET Fact by id. Will 404 if id not found */
  getFact(id: number): Observable<Fact> {
    const url = `${this.FactsUrl}/${id}`;
    return this.http.get<Fact>(url).pipe(
      tap(_ => this.log(`fetched Fact id=${id}`)),
      catchError(this.handleError<Fact>(`getFact id=${id}`))
    );
  }

  /* GET Facts whose name contains search term */
  searchFacts(term: string): Observable<Fact[]> {
    if (!term.trim()) {
      // if not search term, return empty Fact array.
      return of([]);
    }
    return this.http.get<Fact[]>(`${this.FactsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found Facts matching "${term}"`)),
      catchError(this.handleError<Fact[]>('searchFacts', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new Fact to the server */
  addFact (Fact: Fact): Observable<Fact> {
    return this.http.post<Fact>(this.FactsUrl, Fact, httpOptions).pipe(
      tap((Fact: Fact) => this.log(`added Fact w/ id=${Fact.id}`)),
      catchError(this.handleError<Fact>('addFact'))
    );
  }

  /** DELETE: delete the Fact from the server */
  deleteFact (Fact: Fact | number): Observable<Fact> {
    const id = typeof Fact === 'number' ? Fact : Fact.id;
    const url = `${this.FactsUrl}/${id}`;

    return this.http.delete<Fact>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted Fact id=${id}`)),
      catchError(this.handleError<Fact>('deleteFact'))
    );
  }

  /** PUT: update the Fact on the server */
  updateFact (Fact: Fact): Observable<any> {
    return this.http.put(this.FactsUrl, Fact, httpOptions).pipe(
      tap(_ => this.log(`updated Fact id=${Fact.id}`)),
      catchError(this.handleError<any>('updateFact'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a FactService message with the MessageService */
  private log(message: string) {
    this.messageService.add('FactService: ' + message);
  }
}
