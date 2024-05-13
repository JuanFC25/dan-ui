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
  FormLabel,
  Grid,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as authService from "./services/auth.service";
import { JtwStructure } from "./interfaces/jwt";
import jwt from "jsonwebtoken";
import ErrorModal from "./components/errorModal";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarPass, setMostrarPass] = useState(false);
  const [showError, setShowError] = useState(false);

  function handleSumbit(event: any) {
    // const toast = useToast();
    // toast({
    //   title: "Toast",
    //   description: `user: ${event.user} ,  pass: ${event.password}`,
    // });
  }

  async function doLogin() {
    try {
      const token = await authService.login(user, password);

      const tokenDecoded = jwt.decode(token) as unknown as JtwStructure;

      if (tokenDecoded.tipo.tipo === "CLIENTE") {
        router.replace("/cliente/productos");
      } else {
        router.replace("/admin/productos");
      }
    } catch (err) {
      setShowError(true);
    }
  }

  return (
    <ChakraProvider>
      <ErrorModal
        isOpen={showError}
        onClose={() => setShowError(false)}
        title={"Error"}
        message={"Credenciales Incorrectas"}
      ></ErrorModal>
      <Flex
        height="100vh"
        justify="center"
        alignItems="center"
        bg={
          "linear-gradient(180deg, rgba(197,197,197,1) 0%, rgba(255,255,255,1) 100%);"
        }
      >
        <Card width="30%">
          <Flex justify="center">
            <CardHeader>
              <Container>
                <Text>
                  Ingresá a la plataforma para comprar o gestionar tus
                  productos!
                </Text>
              </Container>
            </CardHeader>
          </Flex>
          <CardBody>
            <form onSubmit={handleSumbit}>
              <FormControl>
                <Grid row={2} column={2}></Grid>
                <FormLabel>Usuario:</FormLabel>
                <Input
                  placeholder="Usuario"
                  value={user}
                  onChange={(event) => setUser(event.target.value)}
                ></Input>
                <FormLabel>Contraseña:</FormLabel>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    placeholder="Contraseña"
                    type={mostrarPass ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
              </FormControl>
            </form>
          </CardBody>
          <CardFooter justify="center">
            <Button onClick={() => router.push("/register")}>
              Registrarse
            </Button>

            <Button
              ml="15px"
              onClick={doLogin}
              isDisabled={user === "" || password === ""}
            >
              Login
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </ChakraProvider>
  );
}
