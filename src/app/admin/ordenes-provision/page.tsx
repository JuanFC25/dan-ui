"use client";
import { Producto } from "@/app/interfaces/producto";
import { SearchIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
  ChakraProvider,
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
import { useState, useEffect } from "react";
import * as ordenProvisionService from "../../services/ordenProvision.service";
import { OrdenProvision } from "@/app/interfaces/ordenProvision";
import withAuth from "@/app/hocs/authenticated";

function Home() {
  const router = useRouter();
  const currentPage = usePathname();

  const [ordenesProvision, setordenesProvision] = useState<OrdenProvision[]>(
    []
  );
  const [ordenesProvisionFiltradas, setordenesProvisionFiltradas] = useState<
    OrdenProvision[]
  >([]);

  const [findProducto, setFindProducto] = useState("");

  const fetchordenesProvision = async () => {
    const resp = await ordenProvisionService.getOrdenesProvision();
    setordenesProvision(resp);
    setordenesProvisionFiltradas(resp);
    console.log(resp);
  };

  useEffect(() => {
    fetchordenesProvision();
  }, []);

  function filtrarordenesProvision(nombreOrden: string) {
    // let resp: Producto[] = [];
    // ordenesProvision.map((o) => {
    //   if (nombreOrden.trim() !== "") {
    //     if (o.nombre.includes(nombreOrden)) {
    //       resp.push(p);
    //     }
    //   } else {
    //     resp.push(p);
    //   }
    // });
    // setordenesProvisionFiltradas(resp);
  }

  return (
    <ChakraProvider>
      <Flex height="95vh" bg="#f7f7f7" direction="column">
        <Flex height="95vh" bg="#f7f7f7" direction="column">
          <Flex
            height="10vh"
            width="100%"
            align="center"
            bg="linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(222,221,221,1) 35%);"
          >
            <Button
              ml="15px"
              onClick={() => router.push("/admin/ordenes-provision/add")}
            >
              Agregar Orden de Provisión
            </Button>
            <InputGroup ml="15px" mr="15px">
              <Input
                placeholder="Buscar Orden..."
                value={findProducto}
                onChange={(event) => setFindProducto(event.target.value)}
                background="white"
                onKeyUp={(e) =>
                  e.key === "Enter"
                    ? filtrarordenesProvision(findProducto)
                    : undefined
                }
              ></Input>
              <InputRightAddon>
                <SearchIcon
                  onClick={() => filtrarordenesProvision(findProducto)}
                ></SearchIcon>
              </InputRightAddon>
            </InputGroup>
          </Flex>

          <Flex width="100%" justify="center" m="15px">
            <TableContainer background="#dedddd" rounded={"15px"} width="80%">
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>ID Orden</Th>
                    <Th>Fecha Generación</Th>
                    <Th>Fecha Recepción</Th>
                    <Th>ID Proveedor</Th>
                    <Th>Estado</Th>
                    <Th>Ver Detalle | Modificar | Eliminar</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ordenesProvisionFiltradas?.map((o) => (
                    <Tr key={o.id}>
                      <Td>{o.id}</Td>
                      <Td>
                        {o.fechaGeneracion.toString().split("T")[0] +
                          "  " +
                          o.fechaGeneracion
                            .toString()
                            .split("T")[1]
                            .split(".")[0]}
                      </Td>
                      <Td>
                        {o.fechaRecepcion.toString() ===
                        "1969-02-02T00:00:00.000Z"
                          ? ""
                          : o.fechaRecepcion.toString().split("T")[0] +
                            "  " +
                            o.fechaRecepcion
                              .toString()
                              .split("T")[1]
                              .split(".")[0]}
                      </Td>
                      <Td>{o.proveedorId}</Td>
                      <Td>
                        {o.esCancelada
                          ? "CANCELADA"
                          : o.fechaRecepcion.toString() ===
                            "1969-02-02T00:00:00.000Z"
                          ? "EN PROCESO"
                          : "RECIBIDA"}
                      </Td>
                      <Td display={"flex"} justifyContent="center">
                        <IconButton
                          aria-label="ver detalle"
                          icon={<EditIcon />}
                          onClick={() =>
                            router.push(
                              `/admin/ordenes-provision/detalle?id=${o.id}`
                            )
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
      </Flex>
    </ChakraProvider>
  );
}

export default withAuth(["ADMIN", "EMPLEADO"], Home);
