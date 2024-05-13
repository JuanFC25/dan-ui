import { OrdenProvision } from "../interfaces/ordenProvision";
import { ProductoOrdenProvision } from "../interfaces/ordenProvisionDetalle";
import * as Api from "../services/api.service";
import fetchWrapper from "../utils/fetchWrapper";

export async function getOrdenesProvision(): Promise<OrdenProvision[]> {
  const resp = await fetchWrapper(Api.API_GET_ORDENES_PROVISION, {});
  return await resp.json();
}

export async function getOrdenProvision(
  ordenId: string
): Promise<OrdenProvision> {
  const resp = await fetchWrapper(
    `${Api.API_GET_ORDENES_PROVISION}/${ordenId}`,
    {}
  );
  return await resp.json();
}

export async function cancelarOrdenProvision(ordenId: number) {
  const resp = await fetchWrapper(
    `${Api.API_GET_ORDENES_PROVISION}/${ordenId}`,
    {
      method: "DELETE",
    }
  );
  return await resp.json();
}

export async function modificarOrdenProvision(
  id: number,
  idProv: number,
  listaProductos: ProductoOrdenProvision[]
) {
  const bodyData = JSON.stringify({
    idProveedor: idProv,
    listaProductos: listaProductos,
  });
  console.log(bodyData);
  const resp = await fetchWrapper(
    `${Api.API_GET_ORDENES_PROVISION}/update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyData,
    }
  );
  return await resp.json();
}

export async function confirmarOrden(idOrden: number) {
  const resp = await fetchWrapper(
    `${Api.API_GET_ORDENES_PROVISION}/confirm/${idOrden}`,
    {
      method: "POST",
    }
  );
  console.log("resp service", resp);
  return await resp.json();
}

export async function crearOrden(
  idProv: number,
  listaProd: ProductoOrdenProvision[]
) {
  const bodyData = JSON.stringify({
    idProveedor: idProv,
    listaProductos: listaProd,
  });
  const resp = await fetchWrapper(`${Api.API_GET_ORDENES_PROVISION}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyData,
  });
  return await resp.json();
}
