"use client";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  ChakraProvider,
  Flex,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import * as categoriaService from "../../services/categoria.service";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Categoria } from "@/app/interfaces/categoria";

export default function Home() {
  const router = useRouter();

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState<Categoria[]>(
    []
  );

  const [findCategoria, setFindCategoria] = useState("");

  const fetchCategorias = async () => {
    const resp = await categoriaService.getCategorias();
    setCategorias(resp);
    setCategoriasFiltradas(resp);
    console.log(resp);
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  function filtrarCategorias(nombreCategoria: string) {
    let resp: Categoria[] = [];
    categorias.map((c) => {
      if (nombreCategoria.trim() !== "") {
        if (c.nombre.includes(nombreCategoria)) {
          resp.push(c);
        }
      } else {
        resp.push(c);
      }
    });
    setCategoriasFiltradas(resp);
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
          <Button ml="15px">Agregar Categoria</Button>
          <InputGroup ml="15px" mr="15px">
            <Input
              placeholder="Buscar Categoria..."
              value={findCategoria}
              onChange={(event) => setFindCategoria(event.target.value)}
              background="white"
              onKeyUp={(e) =>
                e.key === "Enter" ? filtrarCategorias(findCategoria) : undefined
              }
            ></Input>
            <InputRightAddon>
              <SearchIcon
                onClick={() => filtrarCategorias(findCategoria)}
              ></SearchIcon>
            </InputRightAddon>
          </InputGroup>
        </Flex>

        <Flex width="100%" justify="center" m="15px">
          <TableContainer background="#dedddd" rounded={"15px"} width="70%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th isNumeric>ID</Th>
                  <Th>Nombre Categoría</Th>
                  <Th w="fit-content">Productos asociados</Th>
                </Tr>
              </Thead>
              <Tbody>
                {categoriasFiltradas.map((c) => (
                  <Tr key={c.id}>
                    <Td isNumeric>{c.id}</Td>
                    <Td>{c.nombre}</Td>
                    <Td w="fit-content">
                      <Button
                        onClick={() =>
                          router.push(
                            `/admin/categorias/productos-asociados?id=${c.id}`
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
