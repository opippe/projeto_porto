import { useState } from "react";

import { Box } from "@chakra-ui/react";

import TopBar from "../components/Layout/TopBar/TopBar";
import SideBar from "../components/Layout/SideBar/SideBar";
import Footer from "../components/Layout/Footer/Footer";

import HomePage from "./Pages/HomePage";
import Usuarios from "./Pages/Usuarios";
import Bercos from "./Pages/Bercos";
import NaviosAtracados from "./Pages/NaviosAtracados";
import Requisicoes from "./Pages/Requisicoes";
import Navios from "./Pages/Navios";
import LineUp from "./Pages/LineUp";

export default function PageRoutes() {
  const [selectedPage, setSelectedPage] = useState("Line-Up");
  return (
    <>
      <TopBar selectedPage={selectedPage} />
      <SideBar setSelectedPage={setSelectedPage} />
      <Box id="page-box" m="5rem 0 40px 0" w="100%" overflow="auto" bg='#EFEDF8' p={4}>
        {selectedPage === "Line-Up" && <LineUp />}
        {selectedPage === "Navios Atracados" && <NaviosAtracados />}
        {selectedPage === "Requisições" && <Requisicoes />}
        {selectedPage === "Usuários" && <Usuarios />}
        {selectedPage === "Navios" && <Navios />}
        {selectedPage === "Berços" && <Bercos />}
        {selectedPage === "Ajuda" && <h1>AJUDA</h1>}
      </Box>
      <Footer />
    </>
  );
}