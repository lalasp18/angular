import { Cliente } from "./cliente.models";
import { Item } from "./item.models";


export interface Locacao {
    idLocacao: number;
    dtLocacao: Date;
    dtDevolucaoPrevista: Date;
    dtDevolucaoEfetiva: Date;
    valorCobrado: number;
    multaCobrada: number;
    item: Item;
    cliente: Cliente;

}
