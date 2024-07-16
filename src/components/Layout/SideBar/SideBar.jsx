import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { Box, Flex, Image, Stack, Button, calc } from "@chakra-ui/react";
import AnchorRoundedIcon from "@mui/icons-material/AnchorRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import DirectionsBoatFilledRoundedIcon from "@mui/icons-material/DirectionsBoatFilledRounded";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import HouseboatIcon from "@mui/icons-material/Houseboat";
import SideBarButton from "./SideBarButton";

function SideBar(props) {
  // Estado para controlar se a barra lateral está escondida ou não
  const [isStowed, setIsStowed] = useState(true);

  // Função para alternar entre mostrar/esconder a barra lateral
  function stowBar() {
    setIsStowed((prevIsStowed) => {
      return !prevIsStowed;
    });
  }

  // Estado para controlar qual item da barra lateral está selecionado
  const [isSelected, setIsSelected] = useState(1);

  // Função para definir qual item da barra lateral está selecionado
  function selected(value) {
    setIsSelected(value);
  }

  // Hook de roteamento para redirecionar após o logout
  const navigate = useNavigate();

  // Função para fazer logout e redirecionar para a página inicial
  function handleLogout() {
    navigate("/");
  }

  return (
    <Box bg="#2D3748" w="300px" p="0 1rem" zIndex="1" id="side-bar" className={isStowed ? '' : 'stowed'}>
      <Button onClick={stowBar} id="side-bar__toggle" type="button" title="ABRIR/FECHAR BARRA LATERAL"><ChevronLeftRoundedIcon id="chevron-left" sx={{ fontSize: 44, fontWeight: 'bold' }} /></Button>
      <Flex mb="1rem">
        <Image
          src={logo}
          alt=""
          maxHeight='80px'
          m="auto"
          filter="brightness(0) invert(1)"
        />
      </Flex>
      <Flex height='calc(100% - 140px)' direction="column" justifyContent='space-between'>
          <Stack h={'100%'}>
            {/* Item da barra lateral para Line-Up */}
            <span
              onClick={() => {
                props.setSelectedPage("Line-Up");
                selected(1);
              }}
            >
              <SideBarButton
                text="Line-Up"
                icon={<DirectionsBoatFilledRoundedIcon />}
                uiOpen={props.uiOpen}
                number={1}
                isSelected={isSelected}
              />
            </span>
            {/* Item da barra lateral para Navios Atracados */}
            <span
              onClick={() => {
                props.setSelectedPage("Navios Atracados");
                selected(2);
              }}
            >
              <SideBarButton
                text="Navios Atracados"
                icon={<AnchorRoundedIcon />}
                uiOpen={props.uiOpen}
                number={2}
                isSelected={isSelected}
              />
            </span>
            {/* Item da barra lateral para Requisições */}
            <span
              onClick={() => {
                props.setSelectedPage("Requisições");
                selected(5);
              }}
            >
              <SideBarButton
                text="Requisições"
                icon={<PostAddRoundedIcon />}
                uiOpen={props.uiOpen}
                number={5}
                isSelected={isSelected}
              />
            </span>
            {/* Item da barra lateral para Usuários */}
            <span
              onClick={() => {
                props.setSelectedPage("Usuários");
                selected(4);
              }}
            >
              <SideBarButton
                text="Usuários"
                icon={<PeopleRoundedIcon />}
                uiOpen={props.uiOpen}
                number={4}
                isSelected={isSelected}
              />
            </span>
            {/* Item da barra lateral para Navios */}
            <span
              onClick={() => {
                props.setSelectedPage("Navios");
                selected(6);
              }}
            >
              <SideBarButton
                text="Navios"
                icon={<DirectionsBoatFilledRoundedIcon />}
                uiOpen={props.uiOpen}
                number={6}
                isSelected={isSelected}
              />
            </span>
            {/* Item da barra lateral para Berços */}
            <span
              onClick={() => {
                props.setSelectedPage("Berços");
                selected(3);
              }}
            >
              <SideBarButton
                text="Berços"
                icon={<HouseboatIcon />}
                uiOpen={props.uiOpen}
                number={3}
                isSelected={isSelected}
              />
            </span>
            {/* Item da barra lateral para Ajuda */}
            <span
              onClick={() => {
                props.setSelectedPage("Ajuda");
                selected(7);
              }}
            >
              <SideBarButton
                text="Ajuda"
                icon={<HelpOutlineRoundedIcon />}
                uiOpen={props.uiOpen}
                number={7}
                isSelected={isSelected}
              />
            </span>
            </Stack>
          {/* Item da barra lateral para Sair */}
          <span
            onClick={() => handleLogout()}
            style={{ width: "100%" }}
          >
            <SideBarButton
              text="Sair"
              icon={<LogoutIcon />}
              uiOpen={props.uiOpen}
              isSelected={isSelected}
            />
          </span>
      </Flex>
    </Box>
  );
}

export default SideBar;
