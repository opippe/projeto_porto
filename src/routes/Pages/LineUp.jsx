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
import GenericTable from '../../components/Layout/GenericTable/GenericTable';
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import { DirectionsBoatFilled } from '@mui/icons-material';

const LineUp = () => {

    const tableHeaders = [
        { key: 'berco', label: 'berco', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' },
        { key: 'imo', label: 'imo', displayInTable: true },
        { key: 'navio', label: 'navio', displayInTable: true },
        { key: 'agencia', label: 'agência', displayInTable: true }, 
        { key: 'operador', label: 'operador', displayInTable: true }, 
        { key: 'eta', label: 'eta', displayInTable: true }, 
    ]

    const data = [
        { berco: 100, imo: 9315877, navio: 'MV Ever Green', dwt: 50000, carga: 'Soja', operacao: 'Carga',  operador: 'João Silva', agencia: 'Agencia Marítima Brasileira', eta: '2024-06-20 10:30', dataSolicitacao: '2024-06-20 10:30', cancelada: false },
        { berco: 100, imo: 9439612, navio: 'MV Blue Ocean', dwt: 45000, carga: 'Minério de Ferro', operacao: 'Descarga', operador: 'João Silva', agencia: 'Logística Marítima', eta: '2024-06-20 12:00', dataSolicitacao: '2024-06-20 10:30', cancelada: true },
        { berco: 100, imo: 9538790, navio: 'MV Atlantic Breeze', dwt: 52000, carga: 'Óleo de Palma', operacao: 'Descarga', operador: 'João Silva', agencia: 'Marítima Global', eta: '2024-06-20 09:45', dataSolicitacao: '2024-06-20 10:30', cancelada: false },
        { berco: 100, imo: 9603102, navio: 'MV Sunrise Glory', dwt: 48000, carga: 'Trigo', operacao: 'Carga', operador: 'João Silva', agencia: 'Agencia Portuária Norte', eta: '2024-06-20 08:30', dataSolicitacao: '2024-06-20 10:30', cancelada: false },
        { berco: 100, imo: 9603102, navio: 'MV Sunrise Glory', dwt: 48000, carga: 'Trigo', operacao: 'Carga', operador: 'João Silva', agencia: 'Agencia Portuária Norte', eta: '2024-06-20 08:30', dataSolicitacao: '2024-06-20 10:30', cancelada: true },
    ];

    return (
        <>
            <Box p={4} id='page-container'>
                <Box mb={4} ml='5px'>
                    <Text fontSize="1.5rem" fontWeight="bold" display='flex' alignItems='center'><DirectionsBoatFilled style={{ marginRight: '.5rem' }}/>Line-Up</Text>
                </Box>
                <Box mb={4} display="flex" justifyContent="space-between" height='100%'>
                    <Tabs variant="line" width="100%">
                        <Stack direction="row" ml='5px'>
                            <TabList>
                                <Tab 
                                    borderRadius="0" 
                                    shadow="none"
                                    _hover={{
                                        shadow: "none",
                                    }}
                                >Visualização Por Berço</Tab>
                                <Tab 
                                    borderRadius="0" 
                                    shadow="none"
                                    _hover={{
                                        shadow: "none",
                                    }}
                                >Visualização Completa</Tab>
                            </TabList>
                        </Stack>
                        <TabPanels height='100%'>
                            <TabPanel p={0}>
                                <Button ml={1.5} mt={4} pointerEvents='none' colorScheme='blue'>Berço 100</Button>
                                <GenericTable
                                    headers={tableHeaders}
                                    data={data}
                                    filterOptions={false}
                                    filterKey=""
                                    page='Navio'
                                    showButtons
                                    showHeaderButton
                                    showEditButton
                                    showDeleteButton
                                    hideZoomSlider
                                />
                                <Button ml={1.5} pointerEvents='none' colorScheme='blue'>Berço 101</Button>
                                <GenericTable
                                    headers={tableHeaders}
                                    data={data}
                                    filterOptions={false}
                                    filterKey=""
                                    page='Navio'
                                    showButtons
                                    showHeaderButton
                                    showEditButton
                                    showDeleteButton
                                    hideZoomSlider
                                />
                            </TabPanel>
                            <TabPanel p={0} height='100%'>
                            <GenericTable
                                    headers={tableHeaders}
                                    data={data}
                                    filterOptions={false}
                                    filterKey=""
                                    page='Navio'
                                    showButtons
                                    showHeaderButton
                                    showEditButton
                                    showDeleteButton
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </>
    );
};

export default LineUp;