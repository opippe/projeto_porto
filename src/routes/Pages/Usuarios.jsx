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
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

const Usuarios = () => {

    const tableHeaders = [
        {key: 'nome', label: 'nome', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' },
        {key: 'email', label: 'e-mail', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' },
        {key: 'setor', label: 'setor', displayInTable: true, addModal: true, editModal: true, editable: false, inputType: 'select', options: ['Administrativo', 'Operacional'] },
        {key: 'cargo', label: 'cargo', displayInTable: true, addModal: true, editModal: true, editable: false, inputType: 'select', options: ['Administrador', 'Supervisor', 'Operador'] },
        {key: 'dataAdicao', label: 'data de adição', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'datetime-local' },
        {key: 'status', label: 'status', displayInTable: true, addModal: true, editModal: true, editable: false, inputType: 'select', options: ['Ativo', 'Inativo']}, 
        {key: 'senha', label: 'senha', displayInTable: false, addModal: true, editModal: true, editable: true, inputType: 'password', },
        {key: 'confirmarSenha', label: 'confirmar senha', displayInTable: false, addModal: true, editModal: true, editable: true, inputType: 'password', },
        {key: 'permissoes', label: 'permissões', displayInTable: false, addModal: true, editModal: true, editable: false, inputType: 'checkbox', options: ['Visualizar', 'Editar', 'Deletar'] },
    ]

    const data = [
        { nome: 'João Silva', email: 'joao.silva@emap.ma.gov.br', setor: 'Administrativo', cargo: 'Administrador', dataAdicao: '2024-06-20 06:00', status: 'Ativo', },
        { nome: 'Maria Borges', email: 'maria.borges@emap.ma.gov.br', setor: 'Operacional', cargo: 'Operador', dataAdicao: '2024-06-20 06:00', status: 'Ativo', },
        { nome: 'Marcos Lopes', email: 'marcos.lopes@emap.ma.gov.br', setor: 'Operacional', cargo: 'Operador', dataAdicao: '2024-06-20 06:00', status: 'Ativo', },
        { nome: 'Sara Pontes', email: 'sara.pontes@emap.ma.gov.br', setor: 'Administrativo', cargo: 'Supervisor', dataAdicao: '2024-06-20 06:00', status: 'Inativo', },
    ];

    return (
        <>
            <Box p={4}>
                <Box mb={4} ml='5px'>
                    <Text fontSize="1.5rem" fontWeight="bold" display='flex' alignItems='center'><PeopleRoundedIcon style={{ marginRight: '.5rem' }}/>Lista de Usuários</Text>
                </Box>
                <Box mb={4} display="flex" justifyContent="space-between">
                    <Tabs variant="line" width="100%">
                        <Stack direction="row" ml='5px'>
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
                            <TabPanel p={0}>
                                <GenericTable
                                    headers={tableHeaders}
                                    data={data}
                                    filterOptions={false}
                                    filterKey=""
                                    page='Usuário'
                                    showButtons
                                    showHeaderButton
                                    showEditButton
                                    showDeleteButton
                                />
                            </TabPanel>
                            <TabPanel p={0}>
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