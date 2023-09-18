import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Classe } from 'src/app/models/classe.models';

@Injectable({
    providedIn: 'root'
})
export class ClasseService {

    private readonly API = '/api/classe-create';

    constructor(private http: HttpClient) { }

    listarClasse(): Observable<Classe[]> {
        return this.http.get<Classe[]>(`${this.API}`);
    }

    salvarClasse(record: Classe[]): Observable<Object> {
        return this.http.post(this.API, record);
    }

    alterarClasse(record: Classe[]): Observable<Object> {
        return this.http.post(this.API + "/editado", record);
    }

    pegarIdClasse(idClasse: number): Observable<Classe> {
        return this.http.get<Classe>(`${this.API}/${idClasse}`);
    }

    deletarClasse(idClasse: number): Observable<Object> {
        return this.http.delete(`${this.API}/${idClasse}`);
    }
}

