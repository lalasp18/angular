import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'src/app/models/classe.models';

@Injectable({
    providedIn: 'root'
})
export class ClasseService {

    private readonly API = '/api/classe';

    constructor(private http: HttpClient) { }

    salvarClasse(record: Classe[]): Observable<Object> {
        return this.http.post(`${this.API}/criar`, record);
    }

    editarClasse(record: Classe[]): Observable<Object> {
        return this.http.put(`${this.API}/editar`, record);
    }

    listarClasse(): Observable<Classe[]> {
        return this.http.get<Classe[]>(`${this.API}/listar`);
    }

    pegarIdClasse(idClasse: number): Observable<Classe> {
        return this.http.get<Classe>(`${this.API}/listar/${idClasse}`);
    }

    deletarClasse(idClasse: number): Observable<Object> {
        return this.http.delete(`${this.API}/deletar/${idClasse}`);
    }
}

