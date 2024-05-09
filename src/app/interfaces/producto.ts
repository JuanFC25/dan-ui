import { Categoria } from "./categoria";
import { OrdenProvisionDetalle } from "./ordenProvisionDetalle";
import { Proveedor } from "./proveedor";

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  proveedorId: number;
  stockActual: number;
  categoriaId: number;
  precioVenta: number;
  OrdenProvisionDetalle?: OrdenProvisionDetalle[];

  //solo se usa en modificar producto
  proveedor?: Proveedor;
  categoria?: Categoria;
}

export interface ProductoCarrito {
  producto: number;
  cantidad: number;
  descuento: number;
  precio?: number;
}
