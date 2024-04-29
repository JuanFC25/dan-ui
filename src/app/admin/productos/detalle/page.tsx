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
import * as productoService from "../../../services/producto.service";
import { EditIcon } from "@chakra-ui/icons";
import { OrdenProvisionDetalle } from "@/app/interfaces/ordenProvisionDetalle";

export default function DetalleProducto() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const productoId = searchParams.get("id");

  const [producto, setProducto] = useState<Producto>();

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [stock, setStock] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [ordenesProvision, setOrdenesProvision] = useState<
    OrdenProvisionDetalle[]
  >([]);
  const [canDelete, setCanDelete] = useState(false);

  const fetchProducto = async () => {
    if (!productoId) {
      return;
    }

    const resp = await productoService.getProductoById(productoId);
    setProducto(resp);
    console.log(resp);
    setNombre(resp.nombre);
    setDescripcion(resp.descripcion);
    setPrecioVenta(resp.precioVenta.toString());
    setStock(resp.stockActual.toString());
    if (resp.categoria) {
      setCategoria(resp.categoria.nombre);
    }
    if (resp.proveedor) {
      setProveedor(resp.proveedor.nombre);
    }
    if (!resp.OrdenProvisionDetalle) {
      return;
    }
    setOrdenesProvision(resp.OrdenProvisionDetalle);
    if (resp.OrdenProvisionDetalle.length === 0) {
      setCanDelete(true);
    }
  };

  useEffect(() => {
    fetchProducto();
  }, []);

  const isFormComplete = () => {
    return (
      nombre !== "" && descripcion !== "" && stock !== "" && precioVenta !== ""
    );
  };

  async function updateProduct() {
    const prod: Producto = {
      id: producto?.id,
      descripcion: descripcion,
      nombre: nombre,
      categoriaId: Number(producto?.categoriaId),
      proveedorId: Number(producto?.proveedorId),
      precioVenta: Number(precioVenta),
      stockActual: Number(stock),
    };
    console.log(prod);

    await productoService.updateProducto(prod);

    router.replace("/admin/productos?r=t");
  }

  async function eliminarProducto() {
    if (!productoId) {
      return;
    }

    await productoService.deleteProducto(productoId);

    router.replace("/admin/productos?r=t");
  }

  return (
    <ChakraProvider>
      <Flex height="95vh" bg="#f7f7f7" direction="column" align="center">
        <Card mt="15px" w="70%">
          <CardHeader textAlign={"center"}>
            <Heading size="md">Modificar Producto</Heading>
          </CardHeader>

          <CardBody>
            <FormControl>
              <InputGroup>
                <InputLeftAddon>ID</InputLeftAddon>
                <Input isDisabled={true} type="text" value={producto?.id} />
              </InputGroup>
              <InputGroup mt="15px">
                <InputLeftAddon>Nombre</InputLeftAddon>
                <Input
                  value={nombre}
                  type="text"
                  placeholder="Nombre del Producto"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Descripción</InputLeftAddon>
                <Input
                  value={descripcion}
                  type="text"
                  placeholder="Descripción del Producto"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Categoria</InputLeftAddon>
                <Input value={categoria} type="text" isDisabled={true} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Proveedor</InputLeftAddon>
                <Input value={proveedor} type="text" isDisabled={true} />
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Stock</InputLeftAddon>

                <NumberInput w={"100%"} value={stock}>
                  <NumberInputField
                    value={stock}
                    placeholder="Stock inicial"
                    onChange={(e) => setStock(e.target.value)}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Precio de venta</InputLeftAddon>
                <NumberInput w={"100%"} value={precioVenta}>
                  <NumberInputField
                    value={stock}
                    placeholder="Precio de venta"
                    onChange={(e) => setPrecioVenta(e.target.value)}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
          </CardBody>

          <CardFooter justify={"center"}>
            <Button
              isDisabled={!canDelete}
              bg="#d54545"
              onClick={() => eliminarProducto()}
            >
              Eliminar
            </Button>

            <Button
              marginLeft={"15px"}
              bg="#d54545"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button
              marginLeft={"15px"}
              bg="#82f862"
              onClick={() => updateProduct()}
              isDisabled={!isFormComplete()}
            >
              Modificar
            </Button>
          </CardFooter>
        </Card>

        <p>
          Solo es posible eliminar productos si no poseen ordenes de provisión
          asociados.
        </p>

        <TableContainer
          mt="15px"
          background="#dedddd"
          rounded={"15px"}
          width="30%"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>ID Orden de Provisión</Th>
                <Th>Cantidad</Th>
                <Th>Precio</Th>
              </Tr>
            </Thead>
            <Tbody>
              {ordenesProvision?.map((o) => (
                <Tr key={o.id}>
                  <Td>{o.ordenProvisionId}</Td>
                  <Td>{o.cantidad}</Td>
                  <Td>{o.precio}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </ChakraProvider>
  );
}
