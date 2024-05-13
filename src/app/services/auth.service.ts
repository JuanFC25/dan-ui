import jwt from "jsonwebtoken";
import { JtwStructure } from "../interfaces/jwt";
import * as Api from "../services/api.service";

interface RespLogin {
  token: string;
}

export async function login(user: string, pass: String) {
  const bodyData = JSON.stringify({
    userName: user,
    password: pass,
  });

  const resp = await fetch(`${Api.API_USUARIO}/login`, {
    method: "POST",
    body: bodyData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const aux = (await resp.json()) as unknown as RespLogin;

  if (!aux.token) {
    throw new Error("Credenciales invalidas");
  }

  const token = aux.token;

  localStorage.setItem("jwt_token", token);

  return token;
}

export function getToken() {
  const token = localStorage.getItem("jwt_token");
  return token;
}

export function getTokenDecoded() {
  const token = localStorage.getItem("jwt_token");
  if (!token) {
    return;
  }
  const resp = jwt.decode(token) as unknown as JtwStructure;
  return resp;
}

export function removeToken() {
  localStorage.clear();
}

export function getUser() {
  const token = getToken();
  if (!token) return;
  const decodedToken = jwt.decode(token) as unknown as JtwStructure;
  return decodedToken.sub;
}

export function getUserClienteId() {
  const token = getToken();
  if (!token) return;
  const decodedToken = jwt.decode(token) as unknown as JtwStructure;
  return decodedToken.clienteId;
}

export function getUserId() {
  const token = getToken();
  if (!token) return;
  const decodedToken = jwt.decode(token) as unknown as JtwStructure;
  return decodedToken.id;
}

export async function register(
  user: string,
  email: string,
  pass: string,
  razonSocial: string
) {
  // Genera un número aleatorio entre 1 (incluido) y 100000 (excluido)
  const min = 1;
  const max = 100000;
  const idCliente = Math.floor(Math.random() * (max - min)) + min;

  const bodyData = JSON.stringify({
    userName: user,
    password: pass,
    correoElectronico: email,
    cliente: idCliente,
    razonSocial: razonSocial,
  });

  const resp = await fetch(`${Api.API_USUARIO}/register`, {
    method: "POST",
    body: bodyData,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await resp.json();
}
