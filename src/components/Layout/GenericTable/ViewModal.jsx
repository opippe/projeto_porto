import React from 'react';
import {
    Button,
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Stack,
    Input,
    Flex,
    Text,
} from "@chakra-ui/react";
import { formatDate } from './utils'; // Assuming formatDate is moved to utils

const ViewModal = ({ isViewOpen, onViewClose, editingRow, setRestoreIndex, onRestoreOpen }) => {
    return (
        <Modal isOpen={isViewOpen} onClose={onViewClose} size='2xl'>
            <ModalOverlay />
            <ModalContent w='700px' maxW='100%'>
                <ModalHeader>Requisição {editingRow?.row.cancelada ? "Cancelada" : ""} N° {editingRow?.row.imo}</ModalHeader>
                <ModalCloseButton />
                <ModalBody display='flex' flexWrap='wrap' justifyContent='flex-start'>
                    <Tabs variant="line" width="100%" height='100%'>
                        <Stack direction="row" ml='5px'>
                            <TabList mb={5}>
                                <Tab borderRadius="0" shadow="none" _hover={{ shadow: "none" }}>Informações do Pedido</Tab>
                                <Tab borderRadius="0" shadow="none" _hover={{ shadow: "none" }}>Informações do Navio</Tab>
                            </TabList>
                        </Stack>
                        <TabPanels h='100%'>
                            <TabPanel p={0}>
                                {/* Informações do Pedido */}
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Agência</FormLabel>
                                    <Input value={editingRow?.row.agencia || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Operador</FormLabel>
                                    <Input value={editingRow?.row.operador || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>ETA</FormLabel>
                                    <Input value={formatDate(editingRow?.row.eta) || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Calado de Entrada Estimado</FormLabel>
                                    <Input value={editingRow?.row.caladoEntradaEstimado || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Calado de Saída Estimado</FormLabel>
                                    <Input value={editingRow?.row.caladoSaidaEstimado || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Observação</FormLabel>
                                    <Input value={editingRow?.row.observacao || ''} readOnly />
                                </FormControl>
                            </TabPanel>
                            <TabPanel p={0}>
                                {/* Informações do Navio */}
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Berço</FormLabel>
                                    <Input value={editingRow?.row.berco || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Nome</FormLabel>
                                    <Input value={editingRow?.row.nome || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>IMO</FormLabel>
                                    <Input value={editingRow?.row.imo || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Boca</FormLabel>
                                    <Input value={editingRow?.row.boca || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>LOA</FormLabel>
                                    <Input value={editingRow?.row.loa || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>DWT</FormLabel>
                                    <Input value={editingRow?.row.dwt || ''} readOnly />
                                </FormControl>
                                <FormControl mb={2} width='100%'>
                                    <FormLabel>Tipo de Carga</FormLabel>
                                    <Input value={editingRow?.row.tipoCarga || ''} readOnly />
                                </FormControl>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </ModalBody>
                <ModalFooter>
                    <Button variant='outline' colorScheme='blue' onClick={onViewClose}>Voltar</Button>
                    {!editingRow?.row.cancelada ? (
                        <Button colorScheme="blue" ml={2}>Adicionar ao Line Up</Button>
                    ) : (
                        <Button colorScheme="blue" ml={2} onClick={() => {
                            setRestoreIndex(editingRow.index);
                            onRestoreOpen();
                        }}>Restaurar Requisição</Button>
                    )}
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ViewModal;