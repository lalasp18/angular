import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Dependente } from 'src/app/models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class DependenteService {

  private readonly API = '/api/dependente';

  constructor(private http: HttpClient) { }

  salvarDependente(record: Dependente[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarDependente(record: Dependente[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarDependente(): Observable<Dependente[]> {
    return this.http.get<Dependente[]>(`${this.API}/listar`);
  }

  pegarIdDependente(id: number): Observable<Dependente> {
    return this.http.get<Dependente>(`${this.API}/listar/${id}`);
  }

  deletarDependente(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${id}`);
  }
}

