import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titulo } from 'src/app/models/titulo.models';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  private readonly API = '/api/titulo-create';

  constructor(private http: HttpClient) { }

  listarTitulo(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.API}`);
  }

  editarTitulo(record: Titulo[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  salvarTitulo(record: Titulo[]): Observable<Object> {
    return this.http.post(this.API, record);
  }

  pegarIdTitulo(idTitulo: number): Observable<Titulo> {
    return this.http.get<Titulo>(`${this.API}/${idTitulo}`);
  }

  deletarTitulo(idTitulo: number): Observable<Object> {
    return this.http.delete(`${this.API}/${idTitulo}`);
  }
}

