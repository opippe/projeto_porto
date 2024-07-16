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

export default function PageRoutes() {
  const [selectedPage, setSelectedPage] = useState("Line-Up");
  return (
    <>
      <TopBar selectedPage={selectedPage} />
      <SideBar setSelectedPage={setSelectedPage} />
      <Box id="page-box" m="5rem 0 1.5rem 0" w="100%" overflow="auto">
        {selectedPage === "Line-Up" && <HomePage />}
        {selectedPage === "Navios Atracados" && <NaviosAtracados />}
        {selectedPage === "Requisições" && <Requisicoes />}
        {selectedPage === "Usuários" && <Usuarios />}
        {selectedPage === "Navios" && <h1><Navios /></h1>}
        {selectedPage === "Berços" && <h1><Bercos /></h1>}
        {selectedPage === "Ajuda" && <h1>AJUDA</h1>}
      </Box>
      <Footer />
    </>
  );
}
