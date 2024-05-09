"use client";

import ConfirmationModal from "@/app/components/confirmationModal";
import LoadingModal from "@/app/components/loadingModal";
import { OrdenProvision } from "@/app/interfaces/ordenProvision";
import {
  OrdenProvisionDetalle,
  ProductoOrdenProvision,
} from "@/app/interfaces/ordenProvisionDetalle";
import { Producto } from "@/app/interfaces/producto";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  Flex,
  Card,
  CardHeader,
  Heading,
  CardBody,
  FormControl,
  Select,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  CardFooter,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import * as ordenProvisionService from "../../../services/ordenProvision.service";
import * as productoService from "../../../services/producto.service";
import ErrorModal from "@/app/components/errorModal";
import withAuth from "@/app/hocs/authenticated";

function AgregarOrden() {
  const router = useRouter();

  const [listaProductos, setListaProductos] = useState<Producto[]>();
  const [listaIdProductosCargados, setListaIdProductosCargados] = useState<
    number[]
  >([]);

  const [isOpenLoading, setIsOpenLoading] = useState(false);

  const [isConfirmConfirmationOpen, setIsConfirmConfirmationOpen] =
    useState(false);

  const [isErrorOpen, setIsErrorOpen] = useState(false);

  const [detalleOrden, setDetalleOrden] = useState<ProductoOrdenProvision[]>(
    []
  );
  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");

  const handleConfirmOrden = async () => {
    try {
      openModalLoading();

      const primerProducto = listaProductos?.find((p) => {
        return p.id === detalleOrden[0].id;
      });
      const proveedorId = primerProducto?.proveedorId;

      if (!proveedorId) {
        return;
      }

      const resp = await ordenProvisionService.crearOrden(
        proveedorId,
        detalleOrden
      );
      if (
        (resp.message =
          "Uno o mas productos no pertenecen al proveedor suministrado")
      ) {
        throw new Error(resp.message);
      }
      setIsConfirmConfirmationOpen(false);
      router.replace("/admin/ordenes-provision");
      closeModalLoading();
    } catch (err: any) {
      console.log("entro al catch");

      setIsConfirmConfirmationOpen(false);
      closeModalLoading();
      setIsErrorOpen(true);
    }
  };

  const fetchProductos = async () => {
    try {
      openModalLoading();
      const resp = await productoService.getProductos();
      setListaProductos(resp);

      closeModalLoading();
    } catch (err) {
      console.log(err);
    }
  };

  const openModalLoading = () => {
    setIsOpenLoading(true);
  };

  const closeModalLoading = () => {
    setIsOpenLoading(false);
  };

  const closeErrorModal = () => {
    setIsErrorOpen(false);
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const isFormComplete = () => {
    return producto !== "" && cantidad !== "" && precio !== "";
  };

  function agregarProducto() {
    const prod: ProductoOrdenProvision = {
      id: Number(producto),
      cantidad: Number(cantidad),
      precio: Number(precio),
    };

    detalleOrden.push(prod);
    setDetalleOrden(detalleOrden);
    listaIdProductosCargados.push(Number(producto));
    setListaIdProductosCargados(listaIdProductosCargados);

    console.log(detalleOrden);
    console.log(listaIdProductosCargados);

    setProducto("");
    setCantidad("");
    setPrecio("");
  }

  function eliminarProducto(id: number) {
    const resp = detalleOrden.filter((p) => {
      return p.id !== id;
    });
    setDetalleOrden(resp);
    const resp2 = listaIdProductosCargados.filter((idProd) => {
      return idProd !== id;
    });
    setListaIdProductosCargados(resp2);
  }

  return (
    <ChakraProvider>
      <LoadingModal isOpen={isOpenLoading} onClose={closeModalLoading} />
      <ErrorModal
        isOpen={isErrorOpen}
        onClose={closeErrorModal}
        title={"Error"}
        message={"Uno o mas productos no pertenecen al proveedor suministrado"}
      />
      <ConfirmationModal
        isOpen={isConfirmConfirmationOpen}
        onClose={() => setIsConfirmConfirmationOpen(false)}
        onConfirm={handleConfirmOrden}
        title="Atención"
        message="¿Esta seguro que desea crear la orden de provisión?"
      />

      <Flex height="95vh" bg="#f7f7f7" direction="column" align="center">
        <Card mt="15px" w="70%">
          <CardHeader textAlign={"center"}>
            <Heading size="md">Crear Orden</Heading>
            <Text mt="15px">
              Recuerde que los productos de una orden deben pertenecer a un
              mismo proveedor
            </Text>
          </CardHeader>

          <CardBody>
            <FormControl>
              <Select
                placeholder="Seleccione un producto para agregar a la orden"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
              >
                {listaProductos?.map((p) =>
                  p.id && !listaIdProductosCargados?.includes(p.id) ? (
                    <option key={p.id} value={p.id}>
                      {p.nombre + "  -  proveedor: " + p.proveedor?.nombre}
                    </option>
                  ) : undefined
                )}
              </Select>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Cantidad</InputLeftAddon>
                <NumberInput w={"100%"}>
                  <NumberInputField
                    value={cantidad}
                    type="text"
                    placeholder="Nombre del Producto"
                    onChange={(e) => setCantidad(e.target.value)}
                  ></NumberInputField>
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Precio</InputLeftAddon>
                <NumberInput w={"100%"}>
                  <NumberInputField
                    value={precio}
                    placeholder="Descripción del Producto"
                    onChange={(e) => setPrecio(e.target.value)}
                  ></NumberInputField>
                </NumberInput>
              </InputGroup>
            </FormControl>
          </CardBody>

          <CardFooter justify={"center"}>
            {" "}
            <Button
              onClick={() => agregarProducto()}
              isDisabled={!isFormComplete()}
              w={"15%"}
              justifySelf={"center"}
            >
              Agregar Producto
            </Button>
          </CardFooter>
        </Card>

        <TableContainer
          mt="15px"
          background="#dedddd"
          rounded={"15px"}
          width="50%"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID Producto</Th>
                <Th>Cantidad</Th>
                <Th>Precio</Th>
                <Th>Remover</Th>
              </Tr>
            </Thead>
            <Tbody>
              {detalleOrden.map((p) => (
                <Tr key={p.id}>
                  <Td>{p.id}</Td>
                  <Td>{p.cantidad}</Td>
                  <Td>{p.precio}</Td>
                  <Td>
                    <IconButton
                      icon={<DeleteIcon />}
                      aria-label={""}
                      onClick={(e) => eliminarProducto(p.id)}
                    ></IconButton>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex mt="15px">
          <Button bg="#19ade5" onClick={() => router.back()}>
            Volver
          </Button>

          <Button
            bg="#82f862"
            ml={"15px"}
            onClick={() => setIsConfirmConfirmationOpen(true)}
            isDisabled={detalleOrden.length === 0}
          >
            Crear Orden
          </Button>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default withAuth(["ADMIN", "EMPLEADO"], AgregarOrden);
