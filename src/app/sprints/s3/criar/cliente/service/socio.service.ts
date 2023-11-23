import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Socio } from 'src/app/models/cliente.models';

@Injectable({
  providedIn: 'root'
})
export class SocioService {

  private readonly API = '/api/socio';

  constructor(private http: HttpClient) { }

  salvarSocio(record: Socio): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarSocio(record: Socio[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  editarSocioDesativo(record: Socio): Observable<Object> {
    return this.http.put(`${this.API}/ativar`, record);
  }

  editarSocioAtivo(record: Socio): Observable<Object> {
    return this.http.put(`${this.API}/desativar`, record);
  }

  listarSocioAtivo(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.API}/listar/ativo`);
  }

  listarSocioAtivoESemMulta(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.API}/listar/ativosmulta`);
  }

  listarSocioInativo(): Observable<Socio[]> {
    return this.http.get<Socio[]>(`${this.API}/listar/inativo`);
  }

  pegarIdSocio(id: number): Observable<Socio> {
    return this.http.get<Socio>(`${this.API}/listar/${id}`);
  }

  deletarSocio(id: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${id}`);
  }
}

