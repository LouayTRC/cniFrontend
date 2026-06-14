import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../utils/api';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private apiUrl = API_BASE_URL + '/chatbot';

  constructor(private http: HttpClient) { }

  sendMessage(message: string, headers: HttpHeaders): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/chat', { message }, { headers });
  }
}
