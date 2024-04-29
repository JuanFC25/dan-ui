"use client";

import { Button, Card, ChakraProvider, Flex } from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";

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
        </Flex>
      </ChakraProvider>
      <div>{children}</div>
    </>
  );
}
