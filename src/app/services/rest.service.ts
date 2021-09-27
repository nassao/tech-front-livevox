import { Injectable } from '@angular/core';

import { environment } from "../../environments/environment";
import { User, UserQuery, UserResponse } from "../models/users-response";

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  baseUrl = environment.baseUrl;
  token = environment.apiAccessToken;

  constructor(private http: HttpClient) { }

  /**
   * Get user list
   * @param query Query parameters for search
   * @returns Array<Users>
   */
  getUsers(query: UserQuery = {}) {
    let queryParams: string = '';
    
    // Process query parameters
    Object.entries(query).forEach(
      ([key, value]) => {
        if (queryParams.length > 0) {
          queryParams += '&';
        }
        queryParams += `${key}=${value}`;
      }
    );

    // only if any parameter, include question mark
    if (queryParams.length > 0) {
      queryParams = '?' + queryParams;
    }

    return this.http.get<UserResponse>(this.baseUrl + queryParams)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Create new user
   * @param data User info
   * @returns User data confirmation
   */
   createUser(data: User) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` })
    };
    return this.http.post<UserResponse>(this.baseUrl, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Update user info
   * @param data New values for user
   * @returns User data confirmation
   */
   updateUser(data: User) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` })
    };
    return this.http.put<UserResponse>(`${this.baseUrl}/${data.id}`, data, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  /**
   * Delete user by id
   * @param id Id to delete
   * @returns User data confirmation
   */
   deleteUser(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` })
    };
    return this.http.delete(`${this.baseUrl}/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
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
    return throwError(error.error);
  }

}

