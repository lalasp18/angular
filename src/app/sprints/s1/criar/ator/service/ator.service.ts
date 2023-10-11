import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ator } from 'src/app/models/ator.models';

@Injectable({
  providedIn: 'root'
})
export class AtorService {

  private readonly API = '/api/ator';

  constructor(private http: HttpClient) { }

  salvarAtor(record: Ator[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarAtor(record: Ator[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarAtor(): Observable<Ator[]> {
    // return this.http.get<Ator[]>(this.API)
    // .pipe(
    //   first(),
    //   tap(Ator => console.log(Ator))
    // );

    return this.http.get<Ator[]>(`${this.API}/listar`);
  }

  pegarIdAtor(idAtor: number): Observable<Ator> {
    return this.http.get<Ator>(`${this.API}/listar/${idAtor}`);
  }

  deletarAtor(idAtor: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${idAtor}`);
  }
}

