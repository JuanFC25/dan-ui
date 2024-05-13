import { randomInt } from "crypto";
import * as Api from "../services/api.service";
import * as authService from "../services/auth.service";
import { ProductoCarrito } from "../interfaces/producto";
import fetchWrapper from "../utils/fetchWrapper";

export async function createPedido(detallePedido: ProductoCarrito[]) {
  //ver si hay que cambiar
  const id = 123123;
  const user = authService.getUser();
  const userId = authService.getUserClienteId();

  const bodyData = JSON.stringify({
    numeroPedido: id,
    usuario: user,
    observaciones: "-",
    cliente: userId,
    detallePedido: detallePedido,
  });
  console.log(bodyData);
  const resp = await fetchWrapper(`${Api.API_PEDIDO}/api/pedido`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: bodyData,
  });

  return await resp.json();
}

export async function getPedidosCliente() {
  // cambiar cuando lo tenga en el jwt
  // const razonSocial = authService.getTokenDecoded()?.clienteRazonSocial;

  const resp = await fetchWrapper(`${Api.API_PEDIDO}/api/pedido/all`, {});
  return await resp.json();
}

export async function getPedidos() {
  const resp = await fetchWrapper(`${Api.API_PEDIDO}/api/pedido`, {});
  return await resp.json();
}

export async function cancelarPedido(id: string) {
  const resp = await fetchWrapper(
    `${Api.API_PEDIDO}/api/pedido/${id}/cancelar`,
    {
      method: "PUT",
    }
  );
  return await resp.json();
}
