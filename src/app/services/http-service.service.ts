import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  private pointsUrl = 'http://localhost:5000/village/village';  // URL to web api
  private treesUrl = 'http://localhost:5000/tree/tree';

  getRabbits(): Observable<object[]> {
    return this.http.get<object[]>(this.pointsUrl);//.pipe(
   //   tap(heroes => console.log('fetched heroes')), catchError(this.handleError('getHeroes', "errer")));

  }

  getTrees(): Observable<object[]> {
    return this.http.get<object[]>(this.treesUrl);//.pipe(
   //   tap(heroes => console.log('fetched heroes')), catchError(this.handleError('getHeroes', "errer")));

  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
