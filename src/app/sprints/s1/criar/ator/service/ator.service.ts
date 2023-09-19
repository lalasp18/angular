import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ator } from 'src/app/models/ator.models';

@Injectable({
  providedIn: 'root'
})
export class AtorService {

  private readonly API = '/api/ator-create';

  constructor(private http: HttpClient) { }
  
  listarAtor(): Observable<Ator[]>{
    // return this.http.get<Ator[]>(this.API)
    // .pipe(
    //   first(),
    //   tap(Ator => console.log(Ator))
    // );
   
    return this.http.get<Ator[]>(`${this.API}`);
  }

  editarAtor(record: Ator[]): Observable<Object>{
    return this.http.post(`${this.API}/editar`, record);
  }

  salvarAtor(record: Ator[]): Observable<Object>{
    return this.http.post(this.API, record);
  }

  pegarIdAtor(idAtor: number): Observable<Ator>{
    return this.http.get<Ator>(`${this.API}/${idAtor}`);
  }

  deletarAtor(idAtor: number): Observable<Object>{
    return this.http.delete(`${this.API}/${idAtor}`);
  }
}

