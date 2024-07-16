import React, { useState } from 'react';
import {
    Box,
    Button,
    Stack,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text,
} from "@chakra-ui/react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GenericTable from '../../components/Layout/GenericTable/GenericTable';

const Usuarios = () => {

    const tableHeaders = [
        {key: 'nome', label: 'nome', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' },
        {key: 'cargo', label: 'cargo', displayInTable: true, addModal: true, editModal: true, editable: false, inputType: 'select', options: ['Administrador', 'Supervisor', 'Operador'] },
        {key: 'dataAdicao', label: 'data de adição', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'datetime-local' },
        {key: 'status', label: 'status', displayInTable: true, addModal: true, editModal: true, editable: false, inputType: 'select', options: ['Ativo', 'Inativo']}, 
        {key: 'senha', label: 'senha', displayInTable: false, addModal: true, editModal: true, editable: true, inputType: 'password', },
        {key: 'confirmarSenha', label: 'confirmar senha', displayInTable: false, addModal: true, editModal: true, editable: true, inputType: 'password', },
        {key: 'permissoes', label: 'permissões', displayInTable: false, addModal: true, editModal: true, editable: false, inputType: 'checkbox', options: ['Visualizar', 'Editar', 'Deletar'] },
    ]

    const data = [
        { nome: 'João Silva', cargo: 'Administrador', dataAdicao: '2024-06-20 06:00', status: 'Ativo', },
        { nome: 'Maria Borges', cargo: 'Operador', dataAdicao: '2024-06-20 06:00', status: 'Ativo', },
        { nome: 'Marcos Lopes', cargo: 'Operador', dataAdicao: '2024-06-20 06:00', status: 'Ativo', },
        { nome: 'Sara Pontes', cargo: 'Supervisor', dataAdicao: '2024-06-20 06:00', status: 'Inativo', },
    ];

    return (
        <>
            <Box p={4}>
                <Box mb={4}>
                    <Text fontSize="1.5rem" fontWeight="bold">Lista de Usuários</Text>
                </Box>
                <Box mb={4} display="flex" justifyContent="space-between">
                    <Tabs variant="line" width="100%">
                        <Stack direction="row">
                            <TabList>
                                <Tab 
                                    borderRadius="0" 
                                    shadow="none"
                                    _hover={{
                                        shadow: "none",
                                    }}
                                >Usuários</Tab>
                                <Tab 
                                    borderRadius="0" 
                                    shadow="none"
                                    _hover={{
                                        shadow: "none",
                                    }}
                                >Logs do Sistema</Tab>
                            </TabList>
                        </Stack>
                        <TabPanels>
                            <TabPanel>
                                <GenericTable
                                    headers={tableHeaders}
                                    data={data}
                                    filterOptions={false}
                                    filterKey=""
                                    page='Usuário'
                                    showButtons={true}
                                />
                            </TabPanel>
                            <TabPanel>
                                {/* LOGS DO SISTEMA aqui */}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </>
    );
};

export default Usuarios;