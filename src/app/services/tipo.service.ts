import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tipo } from '../models/tipo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoService {
  private apiUrl = 'http://localhost:8080/api/tipo';

  constructor(private http: HttpClient) { }

  getTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.apiUrl);
  }

  getTipoById(id: number): Observable<Tipo> {
    return this.http.get<Tipo>(`${this.apiUrl}/${id}`);
  }

  updateTipo(tipo: Tipo, id: number): Observable<Tipo> {
    return this.http.put<Tipo>(`${this.apiUrl}/${id}`, tipo);
  }

  deleteTipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  createTipo(tipo: Tipo): Observable<Tipo> {
    return this.http.post<Tipo>(this.apiUrl, tipo);
  }
}
