"use client";
import { Producto } from "@/app/interfaces/producto";
import { EditIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  ChakraProvider,
  Checkbox,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as productoService from "../../services/producto.service";
import withAuth from "@/app/hocs/authenticated";

function Home() {
  const router = useRouter();
  const currentPage = usePathname();

  const [productos, setproductos] = useState<Producto[]>([]);
  const [productosFiltradas, setproductosFiltradas] = useState<Producto[]>([]);

  const [findProducto, setFindProducto] = useState("");

  const fetchproductos = async () => {
    const resp = await productoService.getProductos();
    setproductos(resp);
    setproductosFiltradas(resp);
  };

  useEffect(() => {
    fetchproductos();
  }, []);

  function filtrarProductos(nombreProducto: string) {
    let resp: Producto[] = [];
    productos.map((p) => {
      if (nombreProducto.trim() !== "") {
        if (p.nombre.includes(nombreProducto)) {
          resp.push(p);
        }
      } else {
        resp.push(p);
      }
    });
    setproductosFiltradas(resp);
  }

  return (
    <ChakraProvider>
      <Flex
        height="95vh"
        bg={
          "linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);"
        }
        direction="column"
      >
        <Flex
          height="10vh"
          width="100%"
          align="center"
          bg="linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(222,221,221,1) 35%);"
        >
          <Button ml="15px" onClick={() => router.push("/admin/productos/add")}>
            Agregar Producto
          </Button>
          <InputGroup ml="15px" mr="15px">
            <Input
              placeholder="Buscar Producto..."
              value={findProducto}
              onChange={(event) => setFindProducto(event.target.value)}
              background="white"
              onKeyUp={(e) =>
                e.key === "Enter" ? filtrarProductos(findProducto) : undefined
              }
            ></Input>
            <InputRightAddon>
              <SearchIcon
                onClick={() => filtrarProductos(findProducto)}
              ></SearchIcon>
            </InputRightAddon>
          </InputGroup>
        </Flex>

        <Flex width="100%" justify="center" m="15px">
          <TableContainer background="white" rounded={"15px"} width="80%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>ID Producto</Th>
                  <Th>Nombre Producto</Th>
                  <Th>Descripción</Th>
                  <Th>ID Proveedor</Th>
                  <Th>ID Categoria</Th>
                  <Th>Precio de Venta</Th>
                  <Th>Stock</Th>
                  <Th>Ver Detalle | Modificar | Eliminar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productosFiltradas?.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.id}</Td>
                    <Td>{p.nombre}</Td>
                    <Td>{p.descripcion}</Td>
                    <Td>{p.proveedorId}</Td>
                    <Td>{p.categoriaId}</Td>
                    <Td>{p.precioVenta}</Td>
                    <Td>{p.stockActual}</Td>
                    <Td display={"flex"} justifyContent="center">
                      <IconButton
                        aria-label="ver detalle"
                        icon={<EditIcon />}
                        onClick={() =>
                          router.push(`/admin/productos/detalle?id=${p.id}`)
                        }
                      ></IconButton>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
export default withAuth(["ADMIN", "EMPLEADO"], Home);
