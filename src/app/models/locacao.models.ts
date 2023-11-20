import { Cliente } from "./cliente.models";
import { Item } from "./item.models";


export interface Locacao {
    dtLocacao: Date;
    dtDevolucaoPrevista: Date;
    dtDevolucaoEfetiva: Date;
    valorCobrado: number;
    multaCobrada: number;
    item: Array<Item>;
    cliente: Cliente;

}
