import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from 'src/app/models/item.models';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly API = '/api/item-create';

  constructor(private http: HttpClient) { }

  listarItem(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.API}`);
  }

  editarItem(record: Item[]): Observable<Object> {
    return this.http.put(`${this.API}/editar`, record);
  }

  salvarItem(record: Item[]): Observable<Object> {
    return this.http.post(this.API, record);
  }

  pegarIdItem(idItem: number): Observable<Item> {
    return this.http.get<Item>(`${this.API}/${idItem}`);
  }

  deletarItem(idItem: number): Observable<Object> {
    return this.http.delete(`${this.API}/${idItem}`);
  }
}

