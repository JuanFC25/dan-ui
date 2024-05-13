"use client";
import { Proveedor } from "@/app/interfaces/proveedor";
import {
  Button,
  ChakraProvider,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as proveedorService from "../../services/proveedor.service";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import withAuth from "@/app/hocs/authenticated";

function Home() {
  const router = useRouter();

  const [proveedores, setproveedores] = useState<Proveedor[]>([]);
  const [proveedoresFiltrados, setproveedoresFiltrados] = useState<Proveedor[]>(
    []
  );

  const [findProveedor, setFindProveedor] = useState("");

  const fetchproveedores = async () => {
    const resp = await proveedorService.getProveedores();
    setproveedores(resp);
    setproveedoresFiltrados(resp);
    console.log(resp);
  };

  useEffect(() => {
    fetchproveedores();
  }, []);

  function filtrarproveedores(nombreProveedor: string) {
    let resp: Proveedor[] = [];
    proveedores.map((p) => {
      if (nombreProveedor.trim() !== "") {
        if (p.nombre.includes(nombreProveedor)) {
          resp.push(p);
        }
      } else {
        resp.push(p);
      }
    });
    setproveedoresFiltrados(resp);
  }

  return (
    <ChakraProvider>
      <Flex height="95vh" bg="#f7f7f7" direction="column">
        <Flex
          height="10vh"
          width="100%"
          align="center"
          bg="linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(222,221,221,1) 35%);"
        >
          <Button ml="15px">Agregar Proveedor</Button>
          <InputGroup ml="15px" mr="15px">
            <Input
              placeholder="Buscar Proveedor..."
              value={findProveedor}
              onChange={(event) => setFindProveedor(event.target.value)}
              background="white"
              onKeyUp={(e) =>
                e.key === "Enter"
                  ? filtrarproveedores(findProveedor)
                  : undefined
              }
            ></Input>
            <InputRightAddon>
              <SearchIcon
                onClick={() => filtrarproveedores(findProveedor)}
              ></SearchIcon>
            </InputRightAddon>
          </InputGroup>
        </Flex>

        <Flex width="100%" justify="center" m="15px">
          <TableContainer background="white" rounded={"15px"} width="70%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th isNumeric>ID</Th>
                  <Th>Nombre Proveedor</Th>
                  <Th>Correo Electronico</Th>
                  <Th w="fit-content">Productos asociados</Th>
                </Tr>
              </Thead>
              <Tbody>
                {proveedoresFiltrados.map((p) => (
                  <Tr key={p.id}>
                    <Td isNumeric>{p.id}</Td>
                    <Td>{p.nombre}</Td>
                    <Td>{p.mail}</Td>
                    <Td w="fit-content">
                      <Button
                        onClick={() =>
                          router.push(
                            `/admin/proveedores/productos-asociados?id=${p.id}`
                          )
                        }
                      >
                        {" "}
                        Ver Productos{" "}
                      </Button>
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
