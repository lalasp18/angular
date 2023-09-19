import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diretor } from 'src/app/models/diretor.models';

@Injectable({
    providedIn: 'root'
})
export class DiretorService {

    private readonly API = '/api/diretor-create';

    constructor(private http: HttpClient) { }

    listarDiretor(): Observable<Diretor[]> {
        return this.http.get<Diretor[]>(`${this.API}`);
    }

    salvarDiretor(record: Diretor[]): Observable<Object> {
        return this.http.post(this.API, record);
    }

    editarDiretor(record: Diretor[]): Observable<Object> {
        return this.http.put(this.API + "/editar", record);
    }
    pegarIdDiretor(idDiretor: number): Observable<Diretor> {
        return this.http.get<Diretor>(`${this.API}/${idDiretor}`);
    }

    deletarDiretor(idDiretor: number): Observable<Object> {
        return this.http.delete(`${this.API}/${idDiretor}`);
    }
}

