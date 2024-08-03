import React from 'react';
import {
    Box,
    Text,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Stack
} from "@chakra-ui/react";
import GenericTable from '../../components/Layout/GenericTable/GenericTable';
import PendingActionsIcon from '@mui/icons-material/PendingActions';

const Requisicoes = () => {
    /* NOMES DAS COLUNAS */
    const tableHeaders = [
        { key: 'dataSolicitacao', label: 'data da solicitação', displayInTable: true }, 
        { key: 'imo', label: 'imo', displayInTable: true },
        { key: 'navio', label: 'navio', displayInTable: true },
        { key: 'agencia', label: 'agência', displayInTable: true }, 
        { key: 'operador', label: 'operador', displayInTable: true }, 
        { key: 'eta', label: 'eta', displayInTable: true }, 
    ];

    /* PLACEHOLDER PARA O JSON (substituir pelos dados vindos do backend) */
    const data = [
        { imo: 9315877, navio: 'MV Ever Green', dwt: 50000, carga: 'Soja', operacao: 'Carga',  operador: 'João Silva', agencia: 'Agencia Marítima Brasileira', eta: '2024-06-20 10:30', dataSolicitacao: '2024-06-20 10:30', cancelada: false },
        { imo: 9439612, navio: 'MV Blue Ocean', dwt: 45000, carga: 'Minério de Ferro', operacao: 'Descarga', operador: 'João Silva', agencia: 'Logística Marítima', eta: '2024-06-20 12:00', dataSolicitacao: '2024-06-20 10:30', cancelada: true },
        { imo: 9538790, navio: 'MV Atlantic Breeze', dwt: 52000, carga: 'Óleo de Palma', operacao: 'Descarga', operador: 'João Silva', agencia: 'Marítima Global', eta: '2024-06-20 09:45', dataSolicitacao: '2024-06-20 10:30', cancelada: false },
        { imo: 9603102, navio: 'MV Sunrise Glory', dwt: 48000, carga: 'Trigo', operacao: 'Carga', operador: 'João Silva', agencia: 'Agencia Portuária Norte', eta: '2024-06-20 08:30', dataSolicitacao: '2024-06-20 10:30', cancelada: false },
        { imo: 9603102, navio: 'MV Sunrise Glory', dwt: 48000, carga: 'Trigo', operacao: 'Carga', operador: 'João Silva', agencia: 'Agencia Portuária Norte', eta: '2024-06-20 08:30', dataSolicitacao: '2024-06-20 10:30', cancelada: true },
    ];

    /* FILTRA LINHAS DA TABELA BASEADO NO VALOR DE "cancelada" */
    const activeRequests = data.filter(item => !item.cancelada);
    const canceledRequests = data.filter(item => item.cancelada);

    return (
        <Box p={4} id='page-container'>
            <Box mb={4} ml='5px'>
                <Text fontSize="1.5rem" fontWeight="bold" display='flex' alignItems='center'>
                    <PendingActionsIcon style={{ marginRight: '.5rem' }} /> Requisições
                </Text>
            </Box>
            <Box display="flex" justifyContent="space-between" height='100%' id='joris'>
                <Tabs variant="line" width="100%" height='100%'>
                    <Stack direction="row" ml='5px'>
                        <TabList>
                            <Tab
                                borderRadius="0"
                                shadow="none"
                                _hover={{
                                    shadow: "none",
                                }}
                            >Requisições Ativas</Tab>
                            <Tab
                                borderRadius="0"
                                shadow="none"
                                _hover={{
                                    shadow: "none",
                                }}
                            >Requisições Canceladas</Tab>
                        </TabList>
                    </Stack>
                    <TabPanels h='100%'>
                        <TabPanel p={0} h='100%'>
                            <GenericTable
                                headers={tableHeaders}
                                data={activeRequests}
                                filterOptions={false}
                                filterKey='berco'
                                filterText='Berço'
                                showButtons
                                showExportButton
                                showViewButton
                            />
                        </TabPanel>
                        <TabPanel p={0} h='100%'>
                            <GenericTable
                                headers={tableHeaders}
                                data={canceledRequests}
                                filterOptions={false}
                                filterKey='berco'
                                filterText='Berço'
                                showButtons
                                showExportButton
                                showViewButton
                            />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
};

export default Requisicoes;