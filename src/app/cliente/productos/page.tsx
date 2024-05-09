"use client";

import {
  AddIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  InfoIcon,
  MinusIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Button,
  ChakraProvider,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInput,
  NumberInputField,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import * as productoService from "../../services/producto.service";
import { useEffect, useState } from "react";
import { Producto, ProductoCarrito } from "@/app/interfaces/producto";
import withAuth from "@/app/hocs/authenticated";
import CarritoModal from "@/app/components/carritoModal";
import * as authService from "../../services/auth.service";
import * as pedidoService from "../../services/pedido.service";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/components/loadingModal";

function ListaProductos() {
  const router = useRouter();
  const [showLoading, setShowLoading] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>([]);
  const [findProducto, setFindProducto] = useState("");
  const [isCarritoOpen, setIsCarritoOpen] = useState(false);

  const [listaIdProductosCargados, setListaIdProductosCargados] = useState<
    number[]
  >([]);
  const [carrito, setCarrito] = useState<ProductoCarrito[]>([]);
  const [cantidades, setCantidades] = useState<{ [key: number]: string }>({});

  const [showAlert, setShowAlert] = useState(false);

  const fetchProductos = async () => {
    const resp = await productoService.getProductos();
    setProductos(resp);
    setProductosFiltrados(resp);
    const initialCantidades: { [key: number]: string } = {};
    resp.forEach((producto) => {
      if (producto.id) {
        initialCantidades[producto.id] = "";
      }
    });
    setCantidades(initialCantidades);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  function logout() {
    authService.removeToken();
    router.push("/");
  }

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
    setProductosFiltrados(resp);
  }

  function agregarAlCarrito(id: number, precioVenta: number) {
    if (id === 0) return;

    const prod: ProductoCarrito = {
      producto: id,
      cantidad: Number(cantidades[id]),
      descuento: 0,
      precio: precioVenta,
    };

    const newCarrito = [...carrito, prod];
    setCarrito(newCarrito);

    const newListaIdProductosCargados = [...listaIdProductosCargados, id];
    setListaIdProductosCargados(newListaIdProductosCargados);
  }

  function eliminarDelCarrito(id: number) {
    if (id === 0) return;

    setCantidades({
      ...cantidades,
      [id]: "",
    });

    const resp = carrito.filter((p) => {
      return p.producto !== id;
    });
    setCarrito(resp);

    const resp2 = listaIdProductosCargados.filter((o) => {
      return o !== id;
    });
    setListaIdProductosCargados(resp2);
  }

  async function confirmarPedido() {
    openModalLoading();

    const resp = await pedidoService.createPedido(carrito);
    console.log(resp);
    setShowAlert(true);
    setIsCarritoOpen(false);
    setTimeout(() => setShowAlert(false), 5000);

    closeModalLoading();
  }

  const openModalLoading = () => {
    setShowLoading(true);
  };

  const closeModalLoading = () => {
    setShowLoading(false);
  };

  return (
    <ChakraProvider>
      <LoadingModal
        isOpen={showLoading}
        onClose={closeModalLoading}
      ></LoadingModal>

      {showAlert && (
        <Alert status="success">
          <AlertIcon />
          Pedido Creado correctamente
        </Alert>
      )}

      <CarritoModal
        isOpen={isCarritoOpen}
        onClose={() => setIsCarritoOpen(false)}
        onConfirm={confirmarPedido}
        productos={carrito}
      ></CarritoModal>
      <Flex
        bg={
          "linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);"
        }
        height={"100vh"}
        direction={"column"}
      >
        <Flex height={"10vh"} bg={"#ffe600"} w={"100%"} align={"center"}>
          <Button ml="15px" bg="white" onClick={() => setIsCarritoOpen(true)}>
            Ver Carrito
          </Button>

          <InputGroup ml="15px" mr="15px">
            <Input
              placeholder="Filtrar Productos por nombre o categoria..."
              background="white"
              value={findProducto}
              onChange={(event) => setFindProducto(event.target.value)}
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
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              mr="15px"
              bg={"white"}
            />
            <MenuList>
              <MenuItem
                icon={<InfoIcon />}
                onClick={() => router.push("/cliente/pedidos")}
              >
                Mis Pedidos
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} onClick={logout}>
                LogOut
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Flex justify={"center"} mt="15px">
          <TableContainer>
            <Table variant="simple" bg={"white"} borderRadius={"15px"}>
              <Thead>
                <Tr>
                  <Th>Nombre Producto</Th>
                  <Th>Descripción</Th>
                  <Th>Categoria</Th>
                  <Th>Precio</Th>
                  <Th>Cantidad</Th>
                  <Th>Agregar al carrito</Th>
                  <Th>Eliminar del carrito</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productosFiltrados.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.nombre}</Td>
                    <Td>{p.descripcion}</Td>
                    <Td>{p.categoria?.nombre}</Td>
                    <Td>{p.precioVenta}</Td>
                    <Td>
                      <NumberInput
                        allowMouseWheel
                        min={1}
                        isDisabled={
                          !p.id || listaIdProductosCargados.includes(p.id)
                        }
                        value={cantidades[p.id ?? 0]}
                        onChange={(value) =>
                          setCantidades((prevCantidades) => ({
                            ...prevCantidades,
                            [p.id ?? 0]: value,
                          }))
                        }
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label=""
                        icon={<AddIcon />}
                        isDisabled={
                          !p.id ||
                          listaIdProductosCargados.includes(p.id) ||
                          cantidades[p.id] === ""
                        }
                        onClick={() =>
                          agregarAlCarrito(p.id ?? 0, p.precioVenta)
                        }
                      ></IconButton>
                    </Td>
                    <Td>
                      <IconButton
                        aria-label=""
                        icon={<MinusIcon />}
                        isDisabled={
                          !p.id || !listaIdProductosCargados.includes(p.id)
                        }
                        onClick={() => eliminarDelCarrito(p.id ?? 0)}
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

export default withAuth(["CLIENTE"], ListaProductos);
