"use client";

import {
  CheckIcon,
  CloseIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  InfoIcon,
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

import { useEffect, useState } from "react";

import withAuth from "@/app/hocs/authenticated";

import * as authService from "../../services/auth.service";
import * as pedidoService from "../../services/pedido.service";
import * as pagoService from "../../services/pago.service";
import { useRouter } from "next/navigation";
import LoadingModal from "@/app/components/loadingModal";
import { Estado, Pedido } from "@/app/interfaces/pedido";
import ConfirmationModal from "@/app/components/confirmationModal";
import ErrorModal from "@/app/components/errorModal";

function ListaPedidos() {
  const router = useRouter();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [confirmationDeleteModalOpen, setConfirmationDeleteModalOpen] =
    useState(false);
  const [confirmationConfirmModalOpen, setConfirmationConfirmModalOpen] =
    useState(false);
  const [infoModalCancelOpen, setInfoModaCancelOpen] = useState(false);
  const [infoModalConfirmOpen, setInfoModaConfirmOpen] = useState(false);

  const [idToDelete, setIdToDelete] = useState("");
  const [idToConfirm, setIdToConfirm] = useState("");

  infoModalConfirmOpen;
  const fetchPedidos = async () => {
    try {
      const resp = await pedidoService.getPedidos();
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
      const resp = await pagoService.cancelarPedido(id);
      console.log(resp);
      setInfoModaCancelOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function confirmarPedido(id: string) {
    try {
      const resp = await pagoService.confirmarPedido(id);
      console.log(resp);
      setInfoModaConfirmOpen(true);
    } catch (err) {
      console.log(err);
    }
  }

  function puedeConfirmar(estados: Estado[]) {
    const estadosList = [
      "ENTREGADO",
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
    setConfirmationDeleteModalOpen(true);
  }

  function handleConfirm(id: string) {
    setIdToConfirm(id);
    setConfirmationConfirmModalOpen(true);
  }

  return (
    <ChakraProvider>
      <ConfirmationModal
        isOpen={confirmationDeleteModalOpen}
        onClose={() => setConfirmationDeleteModalOpen(false)}
        onConfirm={() => cancelarPedido(idToDelete)}
        title={"Atencíon"}
        message={
          "¿Esta seguro que desea cancelar el pedido? Esta acción no se puede revertir."
        }
      ></ConfirmationModal>
      <ConfirmationModal
        isOpen={confirmationConfirmModalOpen}
        onClose={() => setConfirmationConfirmModalOpen(false)}
        onConfirm={() => confirmarPedido(idToConfirm)}
        title={"Atencíon"}
        message={
          "¿Esta seguro que desea confirmar el pedido? Esta acción no se puede revertir."
        }
      ></ConfirmationModal>
      <ErrorModal
        isOpen={infoModalCancelOpen}
        onClose={() => router.replace("/admin/productos")}
        title={"Atención"}
        message={
          "Pedido cancelado correctamente, sera redirigido a la pagina de productos."
        }
      ></ErrorModal>
      <ErrorModal
        isOpen={infoModalConfirmOpen}
        onClose={() => router.replace("/admin/productos")}
        title={"Atención"}
        message={
          "Pedido confirmado correctamente, sera redirigido a la pagina de productos."
        }
      ></ErrorModal>
      <Flex
        bg={
          "linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);"
        }
        height={"100vh"}
        direction={"column"}
      >
        <Flex justify={"center"} mt="35px" w="100%">
          <TableContainer w="80%">
            <Table variant="simple" bg={"white"} borderRadius={"15px"}>
              <Thead>
                <Tr>
                  <Th>ID Pedido</Th>
                  <Th>Cliente</Th>
                  <Th>Fecha</Th>
                  <Th>Estado</Th>
                  <Th>detalle</Th>
                  <Th>Cancelar</Th>
                  <Th>Aceptar</Th>
                </Tr>
              </Thead>
              <Tbody>
                {pedidos.map((p) => (
                  <Tr key={p.id}>
                    <Td>{p.id}</Td>
                    <Td>{p.cliente.razonSocial}</Td>
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
                    <Td>
                      <IconButton
                        aria-label=""
                        icon={<CheckIcon />}
                        isDisabled={!puedeConfirmar(p.estados)}
                        onClick={() => handleConfirm(p.id)}
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

export default withAuth(["ADMIN", "EMPLEADO"], ListaPedidos);
