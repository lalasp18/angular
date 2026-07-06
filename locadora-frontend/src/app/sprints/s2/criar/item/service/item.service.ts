import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item.models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API = '/api/item';

  constructor(private http: HttpClient) { }

  salvarItem(record: Item[]): Observable<Object> {
    return this.http.post(`${this.API}/criar`, record);
  }

  editarItem(record: Item[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  listarItem(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API}/listar`);
  }

  listarItemSemLocacao(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API}/listar/itemslocacao`);
  }

  pegarIdItem(idItem: number): Observable<Item> {
    return this.http.get<Item>(`${this.API}/listar/${idItem}`);
  }

  deletarItem(idItem: number): Observable<Object> {
    return this.http.delete(`${this.API}/deletar/${idItem}`);
  }
}

