import { Producto } from "./producto";

export interface Proveedor {
  id: number;
  nombre: string;
  mail: string;
  productos?: Producto[];
}
