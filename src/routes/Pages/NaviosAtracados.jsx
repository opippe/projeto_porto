import React from 'react';
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
import GenericTable from '../../components/Layout/GenericTable/GenericTable';

const NaviosAtracados = () => {

    const tableHeaders = [
        {key: 'berco', label: 'berço', displayInTable: true },
        {key: 'imo', label: 'imo', displayInTable: true },
        {key: 'navio', label: 'navio', displayInTable: true },
        {key: 'bordo', label: 'bordo', displayInTable: true }, 
        {key: 'comprimento', label: 'comprimento', displayInTable: true }, 
        {key: 'dwt', label: 'dwt', displayInTable: true }, 
        {key: 'carga', label: 'carga', displayInTable: true }, 
        {key: 'quantidadeCarga', label: 'quantidade de carga', displayInTable: true }, 
        {key: 'calado', label: 'calado', displayInTable: true }, 
        {key: 'agencia', label: 'agência', displayInTable: true }, 
        {key: 'ultimaAtualizacao', label: 'última atualização', displayInTable: true, inputType: 'datetime-local' }, 
    ]

    const data = [
        { berco: 99, imo: 9315877, navio: 'MV Ever Green', bordo: 'BB', comprimento: 200, dwt: 50000, carga: 'Soja', quantidadeCarga: 25000, calado: 12.5, agencia: 'Agencia Marítima Brasileira', ultimaAtualizacao: '2024-06-20 10:30' },
        { berco: 100, imo: 9439612, navio: 'MV Blue Ocean', bordo: 'SB', comprimento: 180, dwt: 45000, carga: 'Minério de Ferro', quantidadeCarga: 30000, calado: 11.8, agencia: 'Logística Marítima', ultimaAtualizacao: '2024-06-20 12:00' },
        { berco: 101, imo: 9538790, navio: 'MV Atlantic Breeze', bordo: 'SB', comprimento: 210, dwt: 52000, carga: 'Óleo de Palma', quantidadeCarga: 25000, calado: 13.0, agencia: 'Marítima Global', ultimaAtualizacao: '2024-06-20 09:45' },
        { berco: 100, imo: 9603102, navio: 'MV Sunrise Glory', bordo: 'BB', comprimento: 195, dwt: 48000, carga: 'Trigo', quantidadeCarga: 27000, calado: 12.4, agencia: 'Agencia Portuária Norte', ultimaAtualizacao: '2024-06-20 08:30' },
    ];

    const filterOptions = [99, 100, 101];

    return (
        <>
            <Box p={4}>
                <Box mb={4}>
                    <Text fontSize="1.5rem" fontWeight="bold">Navios Atracados</Text>
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
                                >Tabela</Tab>
                                <Tab 
                                    borderRadius="0" 
                                    shadow="none"
                                    _hover={{
                                        shadow: "none",
                                    }}
                                >Histórico</Tab>
                            </TabList>
                        </Stack>
                        <TabPanels>
                            <TabPanel>
                                <GenericTable
                                    headers={tableHeaders}
                                    data={data}
                                    filterOptions={filterOptions}
                                    filterKey='berco'
                                    filterText='Berço'
                                    showButtons={false}
                                />
                            </TabPanel>
                            <TabPanel>
                                {/* HISTÓRICO aqui */}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </>
    );
};

export default NaviosAtracados;