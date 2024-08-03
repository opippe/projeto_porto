import React, { useState } from "react";
import backgroundPhoto from "../../assets/panorama-itaqui.jpg";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  GridItem,
  Image,
  Flex,
  Input,
  Text,
  Link,
  Button,
} from "@chakra-ui/react";
import { authUserService } from "../../services/apiService";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(""); // Clear error message on change
  };
  
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(""); // Clear error message on change
  };

  const handleClick = async () => {
    // await authUserService(username, password)
    //   .then((data) => {
    //     if (data.token) {
    //       navigate("/atraqui");
    //     } else {
    //       if (data.error === "invalid_username") {
    //         setUsernameError("Nome de usuário inválido! Tente novamente.");
    //       }
    //       if (data.error === "invalid_password") {
    //         setPasswordError("Senha inválida! Tente novamente.");
    //       }
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
    navigate("/atraqui");
  };

  const handleForgotPasswordClick = () => {
    setForgotPassword(true);
  };

  const handleRequestSendClick = () => {
    setRequestSent(true);
  };

  const handleBackClick = () => {
    setForgotPassword(false);
    setRequestSent(false);
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
      <GridItem className="left" w="100%" sx={{ backgroundColor: "#EFEDF8" }}>
        <Flex align="center" justify="center" height="100vh">
          <Box
            w="50%"
            p="2rem"
            color="black"
            sx={{
              backgroundColor: "white",
              borderRadius: ".5rem",
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);",
            }}
          >
            <Image src={logo} w="75%" m="auto" />
            {requestSent ? (
              <>
                <Text mt="2rem" fontWeight={600} fontSize={18}>
                  Sua solicitação foi enviada com sucesso! Aguarde a resposta do administrador para ter acesso novamente ao sistema.
                </Text>
                <Button variant='outline' colorScheme="blue" mt="2rem" w='100%' onClick={handleBackClick}>
                  Voltar
                </Button>
              </>
            ) : (
              <>
                {forgotPassword && !requestSent &&
                  <Text mt="2rem" fontWeight={600} fontSize={18}>
                      Para alterar sua senha, é necessário entrar em contato com o administrador do sistema. Selecione o seu usuário, que enviaremos uma solicitação à ele.
                  </Text>
                }
                <Text fontWeight="500" mt="2rem">
                  Usuário
                </Text>
                <Input
                  type="text"
                  placeholder="Digite seu nome de usuário"
                  value={username}
                  onChange={handleUsernameChange}
                  autoComplete="off"
                  name="user"
                  id="user"
                  m=".25rem 0 1.5rem 0"
                  sx={{ boxShadow: "none", borderColor: usernameError ? "red" : "inherit" }}
                />
                {usernameError && (
                  <Text color="red" mt=".25rem">
                    {usernameError}
                  </Text>
                )}
                {!forgotPassword && (
                  <>
                    <Text fontWeight="500">Senha</Text>
                    <Input
                      type="password"
                      placeholder="Digite sua senha"
                      value={password}
                      onChange={handlePasswordChange}
                      autoComplete="off"
                      name="password"
                      id="password"
                      m=".25rem 0 .25rem 0"
                      sx={{ boxShadow: "none", borderColor: passwordError ? "red" : "inherit" }}
                    />
                    {passwordError && (
                      <Text color="red" mt=".25rem">
                        {passwordError}
                      </Text>
                    )}
                    <Link color="#3182CE" onClick={handleForgotPasswordClick} w='100%'>
                      Esqueceu sua senha?
                    </Link>
                    <Button colorScheme="blue" w="100%" mt="2.5rem" onClick={handleClick}>
                      Entrar
                    </Button>
                  </>
                )}
                {forgotPassword && !requestSent && (
                  <>
                    <Button mt="1.5rem" colorScheme="blue" onClick={handleRequestSendClick} w='100%'>
                      Enviar solicitação
                    </Button>
                    <Button variant='outline' colorScheme="blue" mt="2rem" w='100%' onClick={handleBackClick} marginTop={4}>
                      Voltar
                    </Button>
                  </>
                )}
              </>
            )}
          </Box>
        </Flex>
      </GridItem>
      <GridItem className="right" w="100%">
        <Image src={backgroundPhoto} alt="backgroundPhoto" boxSize="100%" objectFit="cover" />
      </GridItem>
    </Grid>
  );
};

export default LoginPage;