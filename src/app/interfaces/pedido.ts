export interface Pedido {
  id: string;
  fecha: Date;
  numeroPedido: null;
  user: null;
  observaciones: string;
  cliente: Cliente;
  detallePedido: DetallePedido[];
  estados: Estado[];
  total: number;
}

export interface Cliente {
  id: number;
  razonSocial: string;
  cuit: string;
  deuda: null;
  correoElectronico: string;
  maximoCuentaCorriente: number;
}

export interface DetallePedido {
  producto: ProductoPedido;
  cantidad: number;
  descuento: number;
  total: number;
}

export interface ProductoPedido {
  id: number;
  nombre: string;
  precioVenta: number;
  stockActual: number;
}

export interface Estado {
  estado: string;
  fechaEstado: Date;
  userEstado: null;
  detalle: string;
}
