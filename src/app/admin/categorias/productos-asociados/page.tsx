"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Categoria } from "@/app/interfaces/categoria";
import {} from "next/router";
import * as categoriaService from "../../../services/categoria.service";
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

  const categoriaId = searchParams.get("id");

  const [categoria, setCategoria] = useState<Categoria>();
  const [productos, setProductos] = useState<Producto[] | undefined>([]);

  const fetchCategoria = async () => {
    if (!categoriaId) {
      return;
    }
    const resp = (await categoriaService.getCategoriaById(categoriaId))[0];
    setCategoria(resp);
    if (resp.productos) {
      setProductos(resp.productos);
    }
    console.log(resp);
    console.log(categoria);
  };

  useEffect(() => {
    fetchCategoria();
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
                    <Th>ID Categoria</Th>
                    <Th>Nombre Categoría</Th>
                    <Th>ID Producto</Th>
                    <Th>Nombre Producto</Th>
                    <Th>ID Proveedor</Th>
                    <Th>Precio de Venta</Th>
                    <Th>Stock</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {productos?.map((p) => (
                    <Tr key={p.id}>
                      <Td>{categoria?.id}</Td>
                      <Td>{categoria?.nombre}</Td>
                      <Td>{p.id}</Td>
                      <Td>{p.nombre}</Td>
                      <Td>{p.proveedorId}</Td>
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
