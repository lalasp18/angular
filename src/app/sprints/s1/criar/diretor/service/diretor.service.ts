import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Diretor } from 'src/app/models/diretor.models';

@Injectable({
    providedIn: 'root'
})
export class DiretorService {

    private readonly API = '/api/diretor';

    constructor(private http: HttpClient) { }

    salvarDiretor(record: Diretor[]): Observable<Object> {
        return this.http.post(`${this.API}/criar`, record);
    }

    editarDiretor(record: Diretor[]): Observable<Object> {
        return this.http.put(`${this.API}/editar`, record);
    }

    listarDiretor(): Observable<Diretor[]> {
        return this.http.get<Diretor[]>(`${this.API}/listar`);
    }

    pegarIdDiretor(idDiretor: number): Observable<Diretor> {
        return this.http.get<Diretor>(`${this.API}/listar/${idDiretor}`);
    }

    deletarDiretor(idDiretor: number): Observable<Object> {
        return this.http.delete(`${this.API}/deletar/${idDiretor}`);
    }
}

