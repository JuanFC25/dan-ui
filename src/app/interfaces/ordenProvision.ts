import { OrdenProvisionDetalle } from "./ordenProvisionDetalle";
import { Proveedor } from "./proveedor";

export interface OrdenProvision {
  id: number;
  fechaGeneracion: Date;
  fechaRecepcion: Date;
  esCancelada: boolean;
  proveedor?: Proveedor;
  proveedorId: number;
  detalles?: OrdenProvisionDetalle[];
}
