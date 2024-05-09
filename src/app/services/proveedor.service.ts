import { get } from "http";
import * as Api from "../services";
import { Proveedor } from "../interfaces/proveedor";
import fetchWrapper from "../utils/fetchWrapper";

export async function getProveedores(): Promise<Proveedor[]> {
  const resp = await fetchWrapper(Api.API_GET_PROVEEDORES, {});
  return await resp.json();
}

export async function getProveedorById(id: string): Promise<Proveedor[]> {
  const resp = await fetchWrapper(`${Api.API_GET_PROVEEDOR}?id=${id}`, {});
  return await resp.json();
}
