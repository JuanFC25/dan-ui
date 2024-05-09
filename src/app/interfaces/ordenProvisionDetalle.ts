export interface OrdenProvisionDetalle {
  id: number;
  ordenProvisionId: number;
  cantidad: number;
  productoId: number;
  precio: number;
}

export interface ProductoOrdenProvision {
  cantidad: number;
  id: number;
  precio: number;
}
