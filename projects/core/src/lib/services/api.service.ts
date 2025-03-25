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
      // headers: {
      //   Authorization:
      //     'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJxdGhhbmciLCJzdWIiOjEsImlhdCI6MTc0Mjg5OTY5MywiZXhwIjoxNzQyOTAzMjkzfQ.5ChNygpYxLXcmWlxhhBt4HfmdtkJwlzITp7VSfekY-s',
      // },
    });
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + endpoint, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(this.baseUrl + endpoint, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.baseUrl + endpoint);
  }
}
