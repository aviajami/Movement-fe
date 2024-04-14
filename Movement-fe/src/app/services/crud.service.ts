import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const SERVER_URL = 'http://localhost:5093/Users/';

@Injectable()
export class CrudService {

  constructor(private http: HttpClient) { }

  get(url: string) {
    return this.http.get(SERVER_URL + url).pipe(
      catchError(this.handleError)
    );
  }

  post<T>(url: string, data: T){
    return this.http.post(SERVER_URL + url, data).pipe(
        catchError(this.handleError)
        );
    }

  put<T>(url: string, data: T){
    return this.http.put(SERVER_URL + url, data).pipe(
        catchError(this.handleError)
        );
    }

  delete(url: string){
    return this.http.delete(SERVER_URL + url).pipe(
        catchError(this.handleError)
        );
    }

  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError(() => error); 
  }

}
