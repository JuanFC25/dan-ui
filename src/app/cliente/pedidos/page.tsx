"use client";

import {
  AddIcon,
  CloseIcon,
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
import { Estado, Pedido } from "@/app/interfaces/pedido";
import ConfirmationModal from "@/app/components/confirmationModal";
import ErrorModal from "@/app/components/errorModal";

function ListaPedidos() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  const fetchPedidos = async () => {
    try {
      const resp = await pedidoService.getPedidosCliente();
      setPedidos(resp);
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  function logout() {
    authService.removeToken();
    router.push("/");
  }

  async function cancelarPedido(id: string) {
    try {
      const resp = await pedidoService.cancelarPedido(id);
      setInfoModalOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  function puedeCancelar(estados: Estado[]) {
    const estadosList = [
      "RECHAZADO",
      "CANCELADO",
      "EN_DISTRIBUCION",
      "ENTREGADO",
      "PAGO",
    ];
    const resp = estados.filter((e) => {
      return estadosList.includes(e.estado);
    });

    if (resp.length === 0) return true;
    else return false;
  }

  function handleCancel(id: string) {
    setIdToDelete(id);
    setConfirmationModalOpen(true);
  }

  return (
    <ChakraProvider>
      <ConfirmationModal
        isOpen={confirmationModalOpen}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={() => cancelarPedido(idToDelete)}
        title={"Atencíon"}
        message={
          "¿Esta seguro que desea cancelar el pedido? Esta acción no se puede revertir."
        }
      ></ConfirmationModal>

      <ErrorModal
        isOpen={infoModalOpen}
        onClose={() => router.replace("/cliente/productos")}
        title={"Atención"}
        message={
          "Pedido cancelado correctamente, sera redirigido a la pagina de productos."
        }
      ></ErrorModal>
      <Flex
        bg={
          "linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);"
        }
        height={"100vh"}
        direction={"column"}
      >
        <Flex height={"10vh"} bg={"#ffe600"} w={"100%"} align={"center"}>
          <Button ml="15px" bg="white" isDisabled={true}>
            Ver Carrito
          </Button>

          <InputGroup ml="15px" mr="15px">
            <Input
              placeholder="Filtrar Productos por nombre o categoria..."
              background="white"
              isDisabled={true}
            ></Input>
            <InputRightAddon>
              <SearchIcon></SearchIcon>
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
                onClick={() => router.push("/cliente/productos")}
              >
                Productos
              </MenuItem>
              <MenuItem icon={<ExternalLinkIcon />} onClick={logout}>
                LogOut
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        <Flex justify={"center"} mt="15px" w="100%">
          <TableContainer w="80%">
            <Table variant="simple" bg={"white"} borderRadius={"15px"}>
              <Thead>
                <Tr>
                  <Th>ID Pedido</Th>
                  <Th>Fecha</Th>
                  <Th>Estado</Th>
                  <Th>detalle</Th>
                  <Th>Cancelar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pedidos.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.id}</Td>
                    <Td>
                      {p.fecha.toString().split("T")[0] +
                        " " +
                        p.fecha.toString().split("T")[1].split(".")[0]}
                    </Td>
                    <Td>{p.estados[p.estados.length - 1].estado}</Td>
                    <Td>{p.estados[p.estados.length - 1].detalle}</Td>
                    <Td>
                      <IconButton
                        aria-label=""
                        icon={<CloseIcon />}
                        isDisabled={!puedeCancelar(p.estados)}
                        onClick={() => handleCancel(p.id)}
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

export default withAuth(["CLIENTE"], ListaPedidos);
