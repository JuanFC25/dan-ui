import React from "react";
import { useRouter } from "next/navigation";
import * as authService from "../services/auth.service";
import jwt from "jsonwebtoken";
import { JtwStructure } from "../interfaces/jwt";

// HOC para verificar si el usuario está autenticado
const withAuth = <P extends object>(
  allowedRoles: string[],
  WrappedComponent: React.ComponentType<P>
) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const router = useRouter();
    const token = authService.getToken();

    if (!token) {
      // no hay token
      console.log("no hay token");
      router.replace("/");
      authService.removeToken();
      return null;
    }

    const tokenDecoded = jwt.decode(token) as unknown as JtwStructure;

    // Verificar si el usuario está autenticado

    const isAuthenticated = checkAuth(token); // Implementa esta función según tus necesidades

    // Si el usuario no está autenticado, redirigirlo a la página de inicio de sesión
    if (!isAuthenticated) {
      console.log("se vencio la fecha del token");
      authService.removeToken();
      router.replace("/"); // Cambia '/login' según tu ruta de inicio de sesión
      return null;
    }

    const userRol = tokenDecoded.tipo.tipo;
    // const userRol = "CLIENTE";
    // console.log(allowedRoles);
    // console.log(userRol);

    if (!allowedRoles.includes(userRol)) {
      console.log("El usuario no tiene el rol necesario para ver esta pagina");
      authService.removeToken();
      router.replace("/");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  // Devolver el componente envuelto
  return WithAuthComponent;
};

// Función de ejemplo para verificar la autenticación
const checkAuth = (token: string) => {
  if (token) {
    //verificar fecha de expiracion

    // console.log(token);
    return true; // Este es un ejemplo simple, debes implementar tu propia lógica aquí
  }
  return false;
};

export default withAuth;
