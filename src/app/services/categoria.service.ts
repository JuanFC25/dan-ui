import { get } from "http";
import { Categoria } from "../interfaces/categoria";
import * as Api from "../services";

export async function getCategorias(): Promise<Categoria[]> {
  const resp = await fetch(Api.API_GET_CATEGORIAS);
  return resp.json();
}

export async function getCategoriaById(id: string): Promise<Categoria[]> {
  const resp = await fetch(`${Api.API_GET_CATEGORIA}?id=${id}`);

  return resp.json();
}
