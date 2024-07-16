import React from "react";
import backgroundPhoto from "../../assets/panorama-itaqui.jpg";
import logo from "../../assets/logo.png";
import { useState } from "react";
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
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleClick = async () => {
    // await authUserService(username, password)
    //   .then((data) => {
    //     if (data.token) {
    //       navigate("/atraqui");
    //     }
    //   })
    //   .catch((error) => {
    //     alert(error.message);
    //   });
      
      navigate("/atraqui");
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={0}>
      <GridItem className="left" w="100%" sx={{ backgroundColor: "#EFEDF8" }}>
        <Flex align="center" justify="center" height="100vh">
          <Box
            w="50%"
            p="2rem"
            color='black'
            sx={{
              backgroundColor: "white",
              borderRadius: ".5rem",
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06);",
            }}
          >
            <Image src={logo} w="75%" m="auto" />
            <Text fontWeight="500" mt="2rem">
              E-mail
            </Text>
            <Input
              type="text"
              placeholder="Digite seu e-mail"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="off"
              name="user"
              id="user"
              m=".25rem 0 1.5rem 0"
              sx={{ boxShadow: "none" }}
            />
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
              sx={{ boxShadow: "none" }}
            />
            <Link color="#3182CE">Esqueceu sua senha?</Link>
            <Button
              colorScheme="blue"
              w="100%"
              mt="2.5rem"
              onClick={handleClick}
            >
              Entrar
            </Button>
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
