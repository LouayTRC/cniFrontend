import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../utils/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = API_BASE_URL + '/auth';

  constructor(private http:HttpClient) { }

  public login(username:string, password:string):Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', { username, password })
  }

 

}
