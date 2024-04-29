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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [mostrarPass, setMostrarPass] = useState(false);

  function handleSumbit(event: any) {
    // const toast = useToast();
    // toast({
    //   title: "Toast",
    //   description: `user: ${event.user} ,  pass: ${event.password}`,
    // });
  }

  return (
    <ChakraProvider>
      <Flex height="100vh" justify="center" alignItems="center" bg="#dcdcdc">
        <Card width="30%">
          <Flex justify="center">
            <CardHeader>
              <Container>LOGIN APP</Container>
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
            <Button onClick={() => router.replace("/admin/productos")}>
              Login
            </Button>
          </CardFooter>
        </Card>
      </Flex>
    </ChakraProvider>
  );
}
