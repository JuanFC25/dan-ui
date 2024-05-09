"use client";

import { Button, Card, ChakraProvider, Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import * as authService from "../services/auth.service";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const currentPage = usePathname();

  function goCategorias() {
    if (currentPage !== "/admin/categorias") {
      router.push("/admin/categorias");
    }
  }

  function goProveedores() {
    if (currentPage !== "/admin/proveedores") {
      router.push("/admin/proveedores");
    }
  }

  function goProductos() {
    if (currentPage !== "/admin/productos") {
      router.push("/admin/productos");
    }
  }
  function goOrdenes() {
    if (currentPage !== "/admin/ordenes-provision") {
      router.push("/admin/ordenes-provision");
    }
  }

  function goPedidos() {
    if (currentPage !== "/admin/pedidos") {
      router.push("/admin/pedidos");
    }
  }

  function logout() {
    authService.removeToken();
    router.replace("/");
  }

  return (
    <>
      <ChakraProvider>
        <Flex height="5vh" width="100%" bg="#c5c5c5">
          <Button m="5px" onClick={goCategorias}>
            Categorias
          </Button>
          <Button m="5px" onClick={goProveedores}>
            Proveedores
          </Button>
          <Button m="5px" onClick={goProductos}>
            Productos
          </Button>
          <Button m="5px" onClick={goOrdenes}>
            Ordenes de Provision
          </Button>
          <Button m="5px" onClick={goPedidos}>
            Pedidos
          </Button>
          <Button m="5px" onClick={logout}>
            LogOut
          </Button>
        </Flex>
      </ChakraProvider>
      <div>{children}</div>
    </>
  );
}
