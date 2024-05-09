import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Tfoot,
} from "@chakra-ui/react";
import { ProductoCarrito } from "../interfaces/producto";

interface CarritoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productos: ProductoCarrito[];
}

function CarritoModal({
  isOpen,
  onClose,
  onConfirm,
  productos,
}: CarritoModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Carrito de compras</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <TableContainer
            mt="15px"
            background="#dedddd"
            rounded={"15px"}
            width="100%"
          >
            <Table variant="simple" w="100%">
              <Thead>
                <Tr>
                  <Th>ID Producto</Th>
                  <Th>Cantidad</Th>
                  <Th>Precio</Th>
                </Tr>
              </Thead>
              <Tbody>
                {productos.map((p) => (
                  <Tr key={p.producto}>
                    <Td>{p.producto}</Td>
                    <Td>{p.cantidad}</Td>
                    <Td>{p.cantidad * (p.precio ?? 1)}</Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th></Th>
                  <Th>Total</Th>
                  <Th>
                    {productos
                      .map((p) => p.cantidad * (p.precio ?? 1))
                      .reduce((acc, curr) => acc + curr, 0)}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Volver
          </Button>
          <Button
            colorScheme="blue"
            variant="ghost"
            onClick={onConfirm}
            isDisabled={productos.length === 0}
          >
            Confirmar Pedido
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CarritoModal;
