import { useEffect, useState } from "react";
import { Button, Box, Spinner } from "@chakra-ui/react";

import LineUpTable from "../../components/Layout/LineUpTable/LineUpTable";
import AddShipModal from "../../components/Functions/Ship/AddShipModal";

import {
  addNavio,
  fetchNaviosListService,
  fetchBercosListService,
} from "../../services/apiService";

const HomePage = () => {
  const [bercosList, setBercosList] = useState([]);
  const [naviosList, setNaviosList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const naviosData = await fetchNaviosListService();
        setNaviosList(naviosData);
      } catch (error) {
        console.error("Error fetching navios list:", error);
      }
      try {
        const bercoData = await fetchBercosListService();
        setBercosList(bercoData);
        console.log(bercoData);
      } catch (error) {
        console.error("Error fetching navios list:", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAddShip = async (newShipData) => {
    const response = await addNavio(newShipData);
    if (response.ok) {
      alert("Navio atualizado com sucesso!");
      try {
        const updatedNaviosList = await fetchNaviosListService();
        setNaviosList(updatedNaviosList);
      } catch (error) {
        console.error("Error fetching updated navios list:", error);
      }
    } else {
      alert("Ocorreu um erro!");
    }
  };

  return (
    <>
      <Button
        position="absolute"
        colorScheme="blue"
        h="2rem"
        top="1.5rem"
        right="5rem"
        onClick={() => setIsModalOpen(true)}
        shadow="none"
      >
        Registrar Navio +
      </Button>

      {isLoading ? (
        <Spinner />
      ) : (
        <Box>
          {bercosList?.map((item) => (
            <LineUpTable
              key={item.id}
              carga_temp={item.tipoCarga.join(", ")}
              berco={"Berço " + item.nome}
              ships={naviosList.filter((navio) =>
                navio.tipoCarga.includes(item.tipoCarga.join(", "))
              )}
              setShips={setNaviosList}
            />
          ))}
        </Box>
      )}

      <AddShipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddShip={handleAddShip}
      />
    </>
  );
};

export default HomePage;
