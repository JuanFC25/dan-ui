import * as Api from "../services/api.service";
import * as authService from "../services/auth.service";
import fetchWrapper from "../utils/fetchWrapper";

export async function confirmarPedido(id: string) {
  //cambiar
  const idUser = authService.getUserId();

  //   const resp = await fetch(`${Api.API_PAGO}/realizarPago/${id}/${idUser}/Aceptar`, {

  const resp = await fetchWrapper(
    `${Api.API_PAGO}/realizarPago?idPedido=${id}&idUsuario=${idUser}&decision=Aceptar`,
    {
      method: "POST",
    }
  );

  return await resp.json();
}

export async function cancelarPedido(id: string) {
  //cambiar
  const idUser = authService.getUserId();

  const resp = await fetchWrapper(
    `${Api.API_PAGO}/realizarPago?idPedido=${id}&idUsuario=${idUser}&decision=Cancelar`,
    {
      method: "POST",
    }
  );
  console.log(resp);
  return await resp.json();
}
