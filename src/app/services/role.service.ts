import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../utils/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  apiUrl = API_BASE_URL + "/role";

  constructor(private http: HttpClient) { }

  public getAllRoles(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers })
  }

  public getAllRolesWithCountUser(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(this.apiUrl+"/count", { headers })
  }

  
}
