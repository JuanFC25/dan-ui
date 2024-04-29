import { get } from "http";
import * as Api from "../services";
import { Proveedor } from "../interfaces/proveedor";

export async function getProveedores(): Promise<Proveedor[]> {
  const resp = await fetch(Api.API_GET_PROVEEDORES);
  return resp.json();
}

export async function getProveedorById(id: string): Promise<Proveedor[]> {
  const resp = await fetch(`${Api.API_GET_PROVEEDOR}?id=${id}`);
  return resp.json();
}
