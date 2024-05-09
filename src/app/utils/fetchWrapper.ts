// Función de envoltura para fetch que agrega el token de autorización a cada solicitud
import * as authService from "../services/auth.service";

export default async function fetchWrapper(
  url: string,
  options: RequestInit
): Promise<Response> {
  const token = authService.getToken(); // Función para obtener el token de donde sea que lo tengas almacenado
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return fetch(url, options);
}
