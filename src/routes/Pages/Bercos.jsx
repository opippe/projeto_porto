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
import FileUploadIcon from '@mui/icons-material/FileUpload';
import GenericTable from '../../components/Layout/GenericTable/GenericTable';
import HouseboatIcon from "@mui/icons-material/Houseboat";

const Bercos = () => {

    const tableHeaders = [
        {key: 'berco', label: 'berço', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'number' },
        {key: 'comprimento', label: 'comprimento', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'number' },
        {key: 'profundidade', label: 'profundidade', displayInTable: true, addModal: true, editModal: false, editable: true, inputType: 'number' },
        {key: 'caladoMaximo', label: 'calado máximo', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' }, 
        {key: 'dwt', label: 'dwt', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' }, 
        {key: 'tipoNavioPadrao', label: 'tipo de navio padrão', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' }, 
        {key: 'capacidadeGuindaste', label: 'capacidade guindaste', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' }, 
        {key: 'idadeMaxima', label: 'idade máxima', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' }, 
        {key: 'ultimaAtualizacao', label: 'última atualização', displayInTable: true, addModal: true, editModal: true, editable: true, inputType: 'text' }, 
    ]

    const data = [
        { 
            berco: 99, 
            comprimento: 238, 
            profundidade: 15, 
            caladoMaximo: '14,5 + HB', 
            dwt: 120000, 
            tipoNavioPadrao: '', 
            capacidadeGuindaste: '40t', 
            idadeMaxima: 20, 
            ultimaAtualizacao: '2024-06-20 06:00' 
        },
        { 
            berco: 100, 
            comprimento: 278, 
            profundidade: 15, 
            caladoMaximo: '14,5 + HB', 
            dwt: 150000, 
            tipoNavioPadrao: '', 
            capacidadeGuindaste: '50t', 
            idadeMaxima: 25, 
            ultimaAtualizacao: '2024-06-20 06:00' 
        },
        { 
            berco: 101, 
            comprimento: 200, 
            profundidade: 12, 
            caladoMaximo: '11,5 + HB', 
            dwt: 80000, 
            tipoNavioPadrao: '', 
            capacidadeGuindaste: '30t', 
            idadeMaxima: 15, 
            ultimaAtualizacao: '2024-06-20 06:00' 
        },
    ];    

    return (
        <Box p={4} id='page-container'>
            <Box mb={4} ml='5px'>
                <Text fontSize="1.5rem" fontWeight="bold" display='flex' alignItems='center'><HouseboatIcon style={{ marginRight: '.5rem' }}/>Berços</Text>
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
                            >Ativos</Tab>
                            <Tab 
                                borderRadius="0" 
                                shadow="none"
                                _hover={{
                                    shadow: "none",
                                }}
                            >Inativos</Tab>
                        </TabList>
                    </Stack>
                    <TabPanels height='100%'>
                        <TabPanel p={0} height='100%'>
                            <GenericTable
                                headers={tableHeaders}
                                data={data}
                                filterOptions={false}
                                filterKey=""
                                page='Berço'
                                showButtons
                                showEditButton
                                showDeleteButton
                                showHeaderButton
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

export default Bercos;