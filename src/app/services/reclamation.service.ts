import { Injectable } from '@angular/core';
import { API_BASE_URL } from '../utils/api';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../entities/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl = API_BASE_URL + "/reclamation";

  constructor(private http: HttpClient) { }

  // ================= CREATE (multipart + files) =================
  createReclamation(
    formData: FormData,
    headers: HttpHeaders
  ): Observable<Reclamation> {

    // IMPORTANT:
    // remove content-type because browser sets multipart boundary automatically
    const customHeaders = headers.delete('Content-Type');

    return this.http.post<Reclamation>(
      this.baseUrl,
      formData,
      { headers: customHeaders }
    );
  }

  // ================= GET ALL =================
  getAllReclamations(
    headers: HttpHeaders
  ): Observable<Reclamation[]> {

    return this.http.get<Reclamation[]>(
      this.baseUrl,
      { headers }
    );
  }

  // ================= GET BY USER =================
  getMyReclamations(
    headers: HttpHeaders
  ): Observable<Reclamation[]> {

    return this.http.get<Reclamation[]>(
      `${this.baseUrl}/my`,
      { headers }
    );
  }

  // ================= GET BY ID =================
  getById(
    id: string,
    headers: HttpHeaders
  ): Observable<Reclamation> {

    return this.http.get<Reclamation>(
      `${this.baseUrl}/${id}`,
      { headers }
    );
  }

  // ================= UPDATE =================
  updateReclamation(
    id: string,
    formData: FormData,
    headers: HttpHeaders
  ): Observable<Reclamation> {

    const customHeaders = headers.delete('Content-Type');

    return this.http.put<Reclamation>(
      `${this.baseUrl}/${id}`,
      formData,
      {
        headers: customHeaders
      }
    );

  }

  downloadAllFiles(
    id: string,
    headers: HttpHeaders
  ): Observable<Blob> {

    return this.http.get(
      `${this.baseUrl}/${id}/download-files`,
      {
        headers,
        responseType: 'blob'
      }
    );
  }


  // ================= DELETE =================
  deleteReclamation(
    id: string,
    headers: HttpHeaders
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.baseUrl}/${id}`,
      { headers }
    );
  }


  changeReclamationStatus(
    id: string,
    status: number,
    headers: HttpHeaders
  ): Observable<any> {

    return this.http.put(
      `${this.baseUrl}/status/${id}/${status}`,
      {},
      { headers }
    );
  }
}