"use client";

import { Categoria } from "@/app/interfaces/categoria";
import { Producto } from "@/app/interfaces/producto";
import { Proveedor } from "@/app/interfaces/proveedor";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, use } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  OrdenProvisionDetalle,
  ProductoOrdenProvision,
} from "@/app/interfaces/ordenProvisionDetalle";
import { OrdenProvision } from "@/app/interfaces/ordenProvision";

import * as ordenProvisionService from "../../../services/ordenProvision.service";
import * as productoService from "../../../services/producto.service";
import LoadingModal from "@/app/components/loadingModal";
import ConfirmationModal from "@/app/components/confirmationModal";
import withAuth from "@/app/hocs/authenticated";

function DetalleOrden() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ordenId = searchParams.get("id");

  const [orden, setOrden] = useState<OrdenProvision>();
  const [detalleOrden, setDetalleOrden] = useState<OrdenProvisionDetalle[]>();

  const [detalleOrdenFiltrada, setDetalleOrdenFiltrada] =
    useState<ProductoOrdenProvision[]>();
  const [listaProductos, setListaProductos] = useState<Producto[]>();
  const [listaIdProductosCargados, setListaIdProductosCargados] = useState<
    number[]
  >([]);

  const [isOpenLoading, setIsOpenLoading] = useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] =
    useState(false);
  const [isConfirmConfirmationOpen, setIsConfirmConfirmationOpen] =
    useState(false);

  const [producto, setProducto] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precio, setPrecio] = useState("");

  const handleConfirmOrden = async () => {
    try {
      openModalLoading();
      if (!orden) {
        return;
      }
      const resp = await ordenProvisionService.confirmarOrden(orden.id);
      console.log("respuesta", resp);
      setIsConfirmConfirmationOpen(false);
      router.replace("/admin/ordenes-provision");
      closeModalLoading();
    } catch (err) {
      console.log(err);
      closeModalLoading();
    }
  };

  const handleConfirmCancelOrden = async () => {
    openModalLoading();
    if (!orden) {
      return;
    }
    await ordenProvisionService.cancelarOrdenProvision(orden?.id);
    setIsCancelConfirmationOpen(false);
    router.replace("/admin/ordenes-provision");
    closeModalLoading();
  };

  const fetchOrdenProvision = async () => {
    if (ordenId) {
      openModalLoading();
      const resp = await ordenProvisionService.getOrdenProvision(ordenId);

      setOrden(resp);

      if (!resp.detalles) {
        return;
      }
      setDetalleOrden(resp.detalles);

      const array: ProductoOrdenProvision[] = resp.detalles.map((m) => {
        return {
          id: m.productoId,
          cantidad: m.cantidad,
          precio: m.precio,
        };
      });
      setDetalleOrdenFiltrada(array);

      console.log(resp);
      const resp2 = await productoService.getProductosByProveedor(
        resp.proveedorId.toString()
      );
      setListaProductos(resp2);

      if (!resp.detalles) {
        return;
      }
      console.log(resp2);
      const listaIdProd = resp.detalles.map((p) => {
        return p.productoId;
      });
      setListaIdProductosCargados(listaIdProd);

      closeModalLoading();
    }
  };

  const openModalLoading = () => {
    setIsOpenLoading(true);
  };

  const closeModalLoading = () => {
    setIsOpenLoading(false);
  };

  useEffect(() => {
    fetchOrdenProvision();
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

    detalleOrdenFiltrada?.push(prod);
    setDetalleOrdenFiltrada(detalleOrdenFiltrada);
    listaIdProductosCargados.push(Number(producto));
    setListaIdProductosCargados(listaIdProductosCargados);

    console.log(detalleOrdenFiltrada);
    console.log(listaIdProductosCargados);

    setProducto("");
    setCantidad("");
    setPrecio("");
  }

  function eliminarProducto(id: number) {
    const resp = detalleOrdenFiltrada?.filter((p) => {
      return p.id !== id;
    });
    setDetalleOrdenFiltrada(resp);
    const resp2 = listaIdProductosCargados.filter((idProd) => {
      return idProd !== id;
    });
    setListaIdProductosCargados(resp2);
  }

  async function modificarOrden() {
    if (!orden?.proveedorId) {
      return;
    }
    if (!detalleOrdenFiltrada) {
      return;
    }
    await ordenProvisionService.modificarOrdenProvision(
      orden.id,
      orden.proveedorId,
      detalleOrdenFiltrada
    );
    router.replace("/admin/ordenes-provision?r=t");
  }

  return (
    <ChakraProvider>
      <LoadingModal isOpen={isOpenLoading} onClose={closeModalLoading} />
      <ConfirmationModal
        isOpen={isCancelConfirmationOpen}
        onClose={() => setIsCancelConfirmationOpen(false)}
        onConfirm={handleConfirmCancelOrden}
        title="Atención"
        message="¿Esta seguro que desea cancelar la orden? una vez realizado ne sera posible revertir esta acción."
      />
      <ConfirmationModal
        isOpen={isConfirmConfirmationOpen}
        onClose={() => setIsConfirmConfirmationOpen(false)}
        onConfirm={handleConfirmOrden}
        title="Atención"
        message="¿Esta seguro que desea confirmar la orden? una vez realizado ne sera posible revertir esta acción."
      />

      <Flex
        height="95vh"
        bg={
          "linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);"
        }
        direction="column"
        align="center"
      >
        {orden?.fechaRecepcion.toString() !== "1969-02-02T00:00:00.000Z" ||
        orden.esCancelada ? null : (
          <>
            <Card mt="15px" w="70%">
              <CardHeader textAlign={"center"}>
                <Heading size="md">Modificar Orden</Heading>
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
                          {p.nombre}
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
          </>
        )}

        <TableContainer
          mt="15px"
          background="white"
          rounded={"15px"}
          width="50%"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID Orden de Provisión</Th>
                <Th>ID Producto</Th>
                <Th>Cantidad</Th>
                <Th>Precio</Th>
                <Th>Remover</Th>
              </Tr>
            </Thead>
            <Tbody>
              {detalleOrdenFiltrada?.map((p) => (
                <Tr key={p.id}>
                  <Td>{orden?.id}</Td>
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
          {orden?.fechaRecepcion.toString() !== "1969-02-02T00:00:00.000Z" ||
          orden.esCancelada ? null : (
            <>
              <Button
                bg="#f72626"
                ml={"15px"}
                onClick={() => setIsCancelConfirmationOpen(true)}
              >
                Cancelar Orden
              </Button>
              <Button
                bg="#a0f57e"
                ml={"15px"}
                isDisabled={detalleOrdenFiltrada?.length === 0}
                onClick={() => modificarOrden()}
              >
                Modificar Orden
              </Button>
              <Button
                bg="#82f862"
                ml={"15px"}
                onClick={() => setIsConfirmConfirmationOpen(true)}
              >
                Confirmar Orden
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default withAuth(["ADMIN", "EMPLEADO"], DetalleOrden);
