import { get } from "http";
import { Categoria } from "../interfaces/categoria";
import * as Api from "../services";
import fetchWrapper from "../utils/fetchWrapper";

export async function getCategorias(): Promise<Categoria[]> {
  const resp = await fetchWrapper(Api.API_GET_CATEGORIAS, {});
  return await resp.json();
}

export async function getCategoriaById(id: string): Promise<Categoria[]> {
  const resp = await fetchWrapper(`${Api.API_GET_CATEGORIA}?id=${id}`, {});

  return await resp.json();
}
