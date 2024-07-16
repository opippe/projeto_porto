import React, { useState, useEffect } from "react";
import {
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
} from "@chakra-ui/react";

const AddShipModal = ({ isOpen, onClose, onAddShip }) => {
  const [newShipData, setNewShipData] = useState({
    imo: "",
    nome: "",
    boca: 0,
    loa: 0,
    dwt: 0,
    agencia: "",
    etaNor: "",
    operacao: "",
    cargas: "",
    pesoManifestado: 0,
    unidadeManifestada: "",
    clientes: "",
    operadores: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cargas") {
      const { name, options } = e.target;
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);

      setNewShipData({ ...newShipData, [name]: selectedOptions });
    } else {
      setNewShipData({ ...newShipData, [name]: value });
    }
  };

  const handleModalClose = () => {
    onClose();
    setNewShipData({
      imo: "",
      nome: "",
      boca: 0,
      loa: 0,
      dwt: 0,
      agencia: "",
      etaNor: "",
      operacao: "",
      cargas: "",
      pesoManifestado: 0,
      unidadeManifestada: "",
      clientes: "",
      operadores: "",
    });
  };

  const handleAddShip = () => {
    onAddShip(newShipData);
    handleModalClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose} size="4xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Registro de Navio</ModalHeader>
        <ModalBody>
          <Stack flexDirection="row" mb="1rem">
            <FormControl>
              <FormLabel>IMO</FormLabel>
              <Input
                name="imo"
                value={newShipData.imo}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Nome do Navio</FormLabel>
              <Input
                name="nome"
                value={newShipData.nome}
                onChange={handleInputChange}
              />
            </FormControl>
          </Stack>
          <Stack flexDirection="row" mb="1rem">
            <FormControl>
              <FormLabel>Boca</FormLabel>
              <Input
                type="number"
                name="boca"
                value={newShipData.boca}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Loa</FormLabel>
              <Input
                type="number"
                name="loa"
                value={newShipData.loa}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Porte (DWT)</FormLabel>
              <Input
                type="number"
                name="dwt"
                value={newShipData.dwt}
                onChange={handleInputChange}
              />
            </FormControl>
          </Stack>
          <Stack flexDirection="row" mb="1rem">
            <FormControl>
              <FormLabel>Agência</FormLabel>
              <Input
                name="agencia"
                value={newShipData.agencia}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Cliente</FormLabel>
              <Input
                name="clientes"
                value={newShipData.clientes}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Operador</FormLabel>
              <Input
                name="operadores"
                value={newShipData.operadores}
                onChange={handleInputChange}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <Stack flexDirection="row" mb="1rem">
              <FormControl>
                <FormLabel>Peso</FormLabel>
                <Input
                  type="number"
                  name="pesoManifestado"
                  value={newShipData.pesoManifestado}
                  onChange={handleInputChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Unidade</FormLabel>{" "}
                <Input
                  name="unidadeManifestada"
                  value={newShipData.unidadeManifestada}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl mb="1rem">
                <FormLabel>Tipo de carga</FormLabel>
                <Select
                  placeholder="Selecione o tipo de carga"
                  name="cargas"
                  value={newShipData.cargas}
                  onChange={handleInputChange}
                >
                  <option value="CG">Carga Geral</option>
                  <option value="CNTR">Contêineres</option>
                  <option value="GL">Granel Líquido</option>
                  <option value="GS">Granéis Sólidos</option>
                  <option value="GSM">Granéis Sólidos Mecanizados</option>
                  <option value="GLP">Gás Liquefeito de Petróleo</option>
                </Select>
              </FormControl>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Operação</FormLabel>
            <Select
              placeholder="Selecione o tipo de operacao"
              name="operacao"
              value={newShipData.operacao}
              onChange={handleInputChange}
            >
              <option>Carga</option>
              <option>Descarga</option>
              <option>Transbordo</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>ETA/NOR</FormLabel>
            <Input
              type="datetime-local"
              name="etaNor"
              value={newShipData.etaNor}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddShip}>
            Adicionar
          </Button>
          <Button onClick={handleModalClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddShipModal;
