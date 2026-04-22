import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../utils/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = API_BASE_URL + "/user";

  constructor(private http: HttpClient) { }

  public getUserById(id: string, headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers })
  }

  public getAllUsers(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers })
  }

  public getCurrentUser(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/me', { headers })
  }

  public addUser(form: any, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/add', form, { headers })
  }

  public updateUser(id: string, form: any, headers: HttpHeaders): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/${id}`, form, { headers });
  }


  public deleteUser(id: string, headers: HttpHeaders): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }
}
