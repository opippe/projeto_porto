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

const Requisicoes = () => {

    const tableHeaders = [
        {key: 'imo', label: 'imo', displayInTable: true },
        {key: 'navio', label: 'navio', displayInTable: true },
        {key: 'dwt', label: 'dwt', displayInTable: true }, 
        {key: 'carga', label: 'carga', displayInTable: true }, 
        {key: 'operacao', label: 'operação', displayInTable: true }, 
        {key: 'operador', label: 'operador', displayInTable: true }, 
        {key: 'agencia', label: 'agência', displayInTable: true }, 
        {key: 'etanor', label: 'eta/nor', displayInTable: true }, 
    ]

    const data = [
        { imo: 9315877, navio: 'MV Ever Green', dwt: 50000, carga: 'Soja', operacao: 'Carga',  operador: 'João Silva', agencia: 'Agencia Marítima Brasileira', etanor: '2024-06-20 10:30' },
        { imo: 9439612, navio: 'MV Blue Ocean', dwt: 45000, carga: 'Minério de Ferro', operacao: 'Descarga', operador: 'João Silva', agencia: 'Logística Marítima', etanor: '2024-06-20 12:00' },
        { imo: 9538790, navio: 'MV Atlantic Breeze', dwt: 52000, carga: 'Óleo de Palma', operacao: 'Descarga', operador: 'João Silva', agencia: 'Marítima Global', etanor: '2024-06-20 09:45' },
        { imo: 9603102, navio: 'MV Sunrise Glory', dwt: 48000, carga: 'Trigo', operacao: 'Carga', operador: 'João Silva', agencia: 'Agencia Portuária Norte', etanor: '2024-06-20 08:30' },
    ];

    return (
        <>
            <Box p={4}>
                <Box mb={4}>
                    <Text fontSize="1.5rem" fontWeight="bold">Requisições</Text>
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
                                >Hoje</Tab>
                                <Tab 
                                    borderRadius="0" 
                                    shadow="none"
                                    _hover={{
                                        shadow: "none",
                                    }}
                                >Próximas</Tab>
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
                                    filterOptions={false}
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

export default Requisicoes;