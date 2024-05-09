"use client";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  ChakraProvider,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ErrorModal from "../components/errorModal";
import * as authService from "../services/auth.service";

export default function Register() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [razonSocial, setRazonSocial] = useState("");

  const [mostrarPass, setMostrarPass] = useState(false);
  const [isValidRegister, setIsValidRegister] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  async function registrarse() {
    try {
      await authService.register(user, correo, password, razonSocial);

      setShowSuccess(true);
    } catch (err) {
      setShowError(true);
    }
  }

  function coincidenContraseñas() {
    if (password === password2) return true;
    else return false;
  }

  function verificarMail() {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  }

  function verificarCondiciones() {
    if (
      coincidenContraseñas() &&
      verificarMail() &&
      razonSocial !== "" &&
      user !== ""
    ) {
      setIsValidRegister(true);
    } else setIsValidRegister(false);
  }

  const isErrorPass = !coincidenContraseñas();
  const isErrorEmail = !verificarMail();
  return (
    <ChakraProvider>
      <ErrorModal
        isOpen={showSuccess}
        onClose={() => {
          setShowSuccess(false);
          router.replace("/");
        }}
        title={"Atención"}
        message={"Registro exitoso, será redirigido al login."}
      ></ErrorModal>
      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title={"Error"}
        message={"Ha ocurrido un error al registrar el usuario."}
      ></ErrorModal>
      <Flex height="100vh" justify="center" alignItems="center" bg="#dcdcdc">
        <Card width="30%">
          <Flex justify="center">
            <CardHeader>
              <Container>Registrarse</Container>
            </CardHeader>
          </Flex>
          <CardBody>
            <form>
              <Flex w="100%" direction={"column"}>
                <FormControl isRequired>
                  <FormLabel>Usuario:</FormLabel>
                  <Input
                    placeholder="usuario"
                    value={user}
                    onChange={(event) => {
                      setUser(event.target.value);
                      verificarCondiciones();
                    }}
                  ></Input>
                  <FormErrorMessage>
                    Debe ingresar un correo valido
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired isInvalid={isErrorEmail}>
                  <FormLabel>Email:</FormLabel>
                  <Input
                    placeholder="email"
                    value={correo}
                    type="email"
                    onChange={(event) => {
                      setCorreo(event.target.value);
                      verificarCondiciones();
                    }}
                  ></Input>
                  <FormErrorMessage>
                    Debe ingresar un correo valido
                  </FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={isErrorPass}>
                  <FormLabel mt="10px" w="100%">
                    Contraseña:
                  </FormLabel>
                  <InputGroup>
                    <Input
                      placeholder="Contraseña"
                      type={mostrarPass ? "text" : "password"}
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        verificarCondiciones();
                      }}
                    ></Input>
                    <InputRightAddon
                      onClick={() => setMostrarPass((prev) => !prev)}
                    >
                      {!mostrarPass ? (
                        <ViewIcon></ViewIcon>
                      ) : (
                        <ViewOffIcon></ViewOffIcon>
                      )}
                    </InputRightAddon>
                  </InputGroup>

                  <InputGroup mt="10px">
                    <Input
                      placeholder="Repetir Contraseña"
                      type={mostrarPass ? "text" : "password"}
                      value={password2}
                      onChange={(event) => {
                        setPassword2(event.target.value);
                        verificarCondiciones();
                      }}
                    ></Input>
                    <InputRightAddon
                      onClick={() => setMostrarPass((prev) => !prev)}
                    >
                      {!mostrarPass ? (
                        <ViewIcon></ViewIcon>
                      ) : (
                        <ViewOffIcon></ViewOffIcon>
                      )}
                    </InputRightAddon>
                  </InputGroup>
                  <FormErrorMessage>
                    Las contraseñas no son iguales.
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel mt="10px">Razon social:</FormLabel>
                  <Input
                    placeholder="Razon social"
                    value={razonSocial}
                    onChange={(event) => {
                      setRazonSocial(event.target.value);
                      verificarCondiciones();
                    }}
                  ></Input>
                </FormControl>
              </Flex>
            </form>
          </CardBody>
          <CardFooter justify="center">
            <Button onClick={() => router.back()}>Volver</Button>

            <Button
              ml="15px"
              onClick={registrarse}
              isDisabled={!isValidRegister}
            >
              Registrarse
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </ChakraProvider>
  );
}
// isDisabled={verificarCondiciones}
