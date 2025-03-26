import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private readonly baseUrl = 'http://localhost:3000/';

  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(this.baseUrl + endpoint, {
      params,
      withCredentials: true,
    });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, body, {
      withCredentials: true,
    });
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + endpoint, body, {
      withCredentials: true,
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + endpoint, {
      withCredentials: true,
    });
  }
}
