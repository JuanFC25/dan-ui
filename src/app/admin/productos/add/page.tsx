"use client";

import { Proveedor } from "@/app/interfaces/proveedor";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberInput,
  NumberInputField,
  Select,
  Stack,
  StackDivider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as proveedorService from "../../../services/proveedor.service";
import * as categoriaService from "../../../services/categoria.service";
import * as productoService from "../../../services/producto.service";

import { Categoria } from "@/app/interfaces/categoria";
import { useRouter } from "next/navigation";
import { Producto } from "@/app/interfaces/producto";
import withAuth from "@/app/hocs/authenticated";

function AddProducto() {
  const router = useRouter();

  const [proveedores, setproveedores] = useState<Proveedor[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoria, setCategoria] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [stock, setStock] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");

  const fetchCategorias = async () => {
    const resp = await categoriaService.getCategorias();
    setCategorias(resp);
    console.log(resp);
  };

  const fetchproveedores = async () => {
    const resp = await proveedorService.getProveedores();
    setproveedores(resp);
    console.log(resp);
  };

  useEffect(() => {
    fetchproveedores();
    fetchCategorias();
  }, []);

  const isFormComplete = () => {
    return (
      nombre !== "" &&
      descripcion !== "" &&
      categoria !== "" &&
      proveedor !== "" &&
      stock !== "" &&
      precioVenta !== ""
    );
  };

  async function agregarProducto() {
    const prod: Producto = {
      descripcion: descripcion,
      nombre: nombre,
      categoriaId: Number(categoria),
      proveedorId: Number(proveedor),
      precioVenta: Number(precioVenta),
      stockActual: Number(stock),
    };
    console.log(prod);

    await productoService.addProducto(prod);

    router.replace("/admin/productos");
  }

  return (
    <ChakraProvider>
      <Flex
        height="95vh"
        bg={
          "linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);"
        }
        direction="column"
        align="center"
      >
        <Card mt="15px" w="70%">
          <CardHeader textAlign={"center"}>
            <Heading size="md">Agregar Producto</Heading>
          </CardHeader>

          <CardBody>
            <FormControl>
              <InputGroup>
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
                <Select
                  placeholder="Seleccione una categoria"
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Proveedor</InputLeftAddon>
                <Select
                  placeholder="Seleccione un proveedor"
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                >
                  {proveedores.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </Select>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Stock</InputLeftAddon>

                <NumberInput w={"100%"}>
                  <NumberInputField
                    placeholder="Stock inicial"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
            <FormControl>
              <InputGroup mt="15px">
                <InputLeftAddon>Precio de venta</InputLeftAddon>
                <NumberInput w={"100%"}>
                  <NumberInputField
                    placeholder="Stock inicial"
                    value={precioVenta}
                    onChange={(e) => setPrecioVenta(e.target.value)}
                  />
                </NumberInput>
              </InputGroup>
            </FormControl>
          </CardBody>

          <CardFooter justify={"center"}>
            <Button bg="#d54545" onClick={() => router.back()}>
              Cancelar
            </Button>
            <Button
              marginLeft={"15px"}
              bg="#82f862"
              onClick={() => agregarProducto()}
              isDisabled={!isFormComplete()}
            >
              Agregar
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </ChakraProvider>
  );
}

export default withAuth(["ADMIN", "EMPLEADO"], AddProducto);
