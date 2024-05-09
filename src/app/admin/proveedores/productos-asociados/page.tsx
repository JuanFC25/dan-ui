"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Proveedor } from "@/app/interfaces/proveedor";
import {} from "next/router";
import * as proveedorService from "../../../services/proveedor.service";
import { Producto } from "@/app/interfaces/producto";
import {
  Button,
  ChakraProvider,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import withAuth from "@/app/hocs/authenticated";

function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const proveedorId = searchParams.get("id");

  const [proveedor, setproveedor] = useState<Proveedor>();
  const [productos, setProductos] = useState<Producto[] | undefined>([]);

  const fetchproveedor = async () => {
    if (!proveedorId) {
      return;
    }
    const resp = (await proveedorService.getProveedorById(proveedorId))[0];
    setproveedor(resp);
    if (resp.productos) {
      setProductos(resp.productos);
    }
    console.log(resp);
    console.log(proveedor);
  };

  useEffect(() => {
    fetchproveedor();
  }, []);

  return (
    <>
      <ChakraProvider>
        <Flex
          width="100%"
          justify="center"
          m="15px"
          direction="column"
          alignItems={"center"}
        >
          <Flex w={"70%"} align={"start"} direction={"column"}>
            <Button
              leftIcon={<ArrowBackIcon />}
              width={"fit-content"}
              mb={"15px"}
              onClick={() => router.back()}
            >
              Volver
            </Button>
            <TableContainer background="#dedddd" rounded={"15px"} width="100%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID proveedor</Th>
                    <Th>Nombre Proveedor</Th>
                    <Th>ID Producto</Th>
                    <Th>Nombre Producto</Th>
                    <Th>ID Categoría</Th>
                    <Th>Precio de Venta</Th>
                    <Th>Stock</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productos?.map((p) => (
                    <Tr key={p.id}>
                      <Td>{proveedor?.id}</Td>
                      <Td>{proveedor?.nombre}</Td>
                      <Td>{p.id}</Td>
                      <Td>{p.nombre}</Td>
                      <Td>{p.categoriaId}</Td>
                      <Td>{p.precioVenta}</Td>
                      <Td>{p.stockActual}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Flex>
      </ChakraProvider>
    </>
  );
}

export default withAuth(["ADMIN", "EMPLEADO"], Home);
