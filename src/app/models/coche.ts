import {Marca} from "./marca"
import {Tipo} from "./tipo"
export class Coche {
    id: number;
    placa: string;
    puerta: string;
    marca: Marca;
    tipo: Tipo;

    constructor(id: number = 0, nombre: string = '', marca: Marca, tipo: Tipo) {
        this.id = id;
        this.placa = nombre;
        this.puerta = nombre;
        this.marca = marca;
        this.tipo = tipo;
    }
}
