import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Locacao } from 'src/app/models/locacao.models';

@Injectable({
  providedIn: 'root'
})
export class LocacaoService {

  private readonly API = '/api/locacao';

  constructor(private http: HttpClient) { }

  salvarLocacao(record: Locacao[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarLocacao(id: number): Observable<Object> {
    return this.http.put(`${this.API}/editar`, id);
  }

  listarLocacaoPendente(): Observable<Locacao[]> {
    return this.http.get<Locacao[]>(`${this.API}/listar/pendente`);
  }

  listarLocacaoDevolvida(): Observable<Locacao[]> {
    return this.http.get<Locacao[]>(`${this.API}/listar/devolvida`);
  }

  pegarIdLocacao(id: number): Observable<Locacao> {
    return this.http.get<Locacao>(`${this.API}/listar/${id}`);
  }

  deletarLocacao(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${id}`);
  }
}

