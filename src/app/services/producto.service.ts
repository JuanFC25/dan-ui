import { Producto } from "../interfaces/producto";
import * as Api from "../services";

export async function getProductos(): Promise<Producto[]> {
  const resp = await fetch(Api.API_GET_PRODUCTOS);
  return resp.json();
}

export async function getProductoById(id: string): Promise<Producto> {
  const resp = await fetch(`${Api.API_GET_PRODUCTOS}/${id}`);

  return resp.json();
}

export async function addProducto(prod: Producto) {
  const formData = new URLSearchParams();
  formData.append("nombre", prod.nombre);
  formData.append("descripcion", prod.descripcion);
  formData.append("idCategoria", prod.categoriaId.toString());
  formData.append("idProveedor", prod.proveedorId.toString());
  formData.append("stock", prod.stockActual.toString());
  formData.append("precioVenta", prod.precioVenta.toString());

  const resp = await fetch(Api.API_ADD_PRODUCTO, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
  return resp;
}

export async function updateProducto(prod: Producto) {
  if (!prod.id) return;
  console.log("producto service uptdateProd: ", prod);

  const formData = new URLSearchParams();
  formData.append("id", prod.id.toString());
  formData.append("nombre", prod.nombre);
  formData.append("descripcion", prod.descripcion);
  formData.append("stock", prod.stockActual.toString());
  formData.append("precioVenta", prod.precioVenta.toString());

  const resp = await fetch(Api.API_ADD_PRODUCTO, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });
  return resp;
}

export async function deleteProducto(idProd: string) {
  const resp = await fetch(`${Api.API_GET_PRODUCTOS}/${idProd}`, {
    method: "DELETE",
  });
  return resp;
}
