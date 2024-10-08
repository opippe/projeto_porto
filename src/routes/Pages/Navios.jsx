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
import SailingRoundedIcon from '@mui/icons-material/SailingRounded';

const Navios = () => {

    const tableHeaders = [
        {key: 'imo', label: 'imo', displayInTable: true, addModal: true, editModal: true, editable: true },
        {key: 'navio', label: 'navio', displayInTable: true, addModal: true, editModal: true, editable: true  },
        {key: 'boca', label: 'boca', displayInTable: true, addModal: true, editModal: true, editable: true  }, 
        {key: 'loa', label: 'loa', displayInTable: true, addModal: true, editModal: true, editable: true  }, 
        {key: 'dwt', label: 'dwt', displayInTable: true, addModal: true, editModal: true, editable: true  }, 
        {key: 'agencia', label: 'agência', displayInTable: true, addModal: true, editModal: true, editable: true  }, 
    ]

    const data = [
        { imo: 9315877, navio: 'MV Ever Green', boca: 999, loa: 999, dwt: 50000, agencia: 'Agencia Marítima Brasileira' },
        { imo: 9439612, navio: 'MV Blue Ocean', boca: 999, loa: 999, dwt: 45000, agencia: 'Logística Marítima' },
        { imo: 9538790, navio: 'MV Atlantic Breeze', boca: 999, loa: 999, dwt: 52000, agencia: 'Marítima Global' },
        { imo: 9603102, navio: 'MV Sunrise Glory', boca: 999, loa: 999, dwt: 48000, agencia: 'Agencia Portuária Norte' },
    ];

    return (
        <Box p={4} id='page-container'>
            <Box mb={4} ml='5px'>
                <Text fontSize="1.5rem" fontWeight="bold" display='flex' alignItems='center'><SailingRoundedIcon style={{ marginRight: '.5rem' }}/>Navios</Text>
            </Box>
            <Box mb={4} display="flex" justifyContent="space-between" height='100%'>
                <Tabs variant="line" width="100%" height='100%'>
                    <Stack direction="row" ml='5px'>
                        <TabList>
                            <Tab 
                                borderRadius="0" 
                                shadow="none"
                                _hover={{
                                    shadow: "none",
                                }}
                            >Navios</Tab>
                        </TabList>
                    </Stack>
                    <TabPanels>
                        <TabPanel p={0} height='100%'>
                            <GenericTable
                                headers={tableHeaders}
                                data={data}
                                page='Navio'
                                showButtons={true}
                                showHeaderButton
                                showEditButton
                                showDeleteButton
                            />
                        </TabPanel>
                        <TabPanel p={0} height='100%'>
                            {/* INATIVOS aqui */}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </Box>
    );
};

export default Navios;