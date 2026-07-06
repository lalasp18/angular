import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Titulo } from 'src/app/models/titulo.models';

@Injectable({
  providedIn: 'root'
})
export class TituloService {

  private readonly API = '/api/titulo';

  constructor(private http: HttpClient) { }

  salvarTitulo(record: Titulo[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarTitulo(record: Titulo[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarTitulo(): Observable<Titulo[]> {
    return this.http.get<Titulo[]>(`${this.API}/listar`);
  }

  pegarIdTitulo(idTitulo: number): Observable<Titulo> {
    return this.http.get<Titulo>(`${this.API}/listar/${idTitulo}`);
  }

  deletarTitulo(idTitulo: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${idTitulo}`);
  }
}

