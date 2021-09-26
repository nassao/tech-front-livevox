import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";
import { UsersResponse, Users, UsersResponsePagination } from "../models/users-response";

import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  /**
   * Get user list
   * @returns Array<Users>
   */
  getUsers() {
    return this.http.get<UsersResponse>(this.baseUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  /**
   * Error Handler
   * @param error 
   * @returns 
   */
  private handleError(error: HttpErrorResponse) {
    // Write error in console
    console.error(`Error code: ${error.status}, body: `, error.error);
    // Return error messaje
    return throwError('Error; please try again.');
  }

}

