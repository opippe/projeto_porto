import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Select,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Stack,
    Checkbox,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Switch,
    Flex,
    Text,
    Heading,
} from '@chakra-ui/react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import IosShareIcon from '@mui/icons-material/IosShare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AdminPanelSettingsOutlined, DirectionsBoatFilledRounded, HistoryOutlined } from '@mui/icons-material';

const GenericTable = ({ page, headers, data: initialData, filterOptions, filterKey, filterText, showButtons, showEditButton, showDeleteButton, showExportButton, showViewButton, showHeaderButton, hideZoomSlider }) => {
    const [zoom, setZoom] = useState(0.8);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [filterValue, setFilterValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(initialData);
    const [isEditing, setIsEditing] = useState(false);
    const [editingRow, setEditingRow] = useState(null);
    const [newRow, setNewRow] = useState(initializeFormData());
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
    const [deleteIndex, setDeleteIndex] = useState(null);
    const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure();
    const [restoreIndex, setRestoreIndex] = useState(null);

    const [isAddValid, setIsAddValid] = useState(false);
    const [isEditValid, setIsEditValid] = useState(false);

    function initializeFormData() {
        const initialData = {};
        headers.forEach(header => {
            if (header.inputType === 'select' && header.options.length > 0) {
                initialData[header.key] = header.options[0];
            } else if (header.inputType === 'checkbox') {
                initialData[header.key] = [];
            } else {
                initialData[header.key] = '';
            }
        });
        return initialData;
    }

    useEffect(() => {
        setIsAddValid(validateFormData(newRow, headers, 'addModal'));
    }, [newRow]);

    useEffect(() => {
        if (editingRow) {
            setIsEditValid(validateFormData(editingRow.row, headers, 'editModal'));
        }
    }, [editingRow]);

    function validateFormData(formData, headers, modalType) {
        return headers.every(header => {
            if (header[modalType]) {
                return formData[header.key] !== '';
            }
            return true;
        });
    }

    const onSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedData = useMemo(() => {
        let sortableData = [...data];
        if (sortConfig.key) {
            sortableData.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableData;
    }, [data, sortConfig]);

    const filteredData = useMemo(() => {
        let filteredData = sortedData;

        if (filterValue) {
            filteredData = filteredData.filter(row => {
                const value = row[filterKey];
                if (typeof value === 'string') {
                    return value === filterValue;
                } else {
                    return String(value) === filterValue;
                }
            });
        }

        if (searchValue) {
            filteredData = filteredData.filter(row =>
                headers.some(header =>
                    String(row[header.key]).toLowerCase().includes(searchValue.toLowerCase())
                )
            );
        }

        return filteredData;
    }, [sortedData, filterValue, searchValue, headers, filterKey]);

    const handleAddRow = () => {
        setData([...data, newRow]);
        setNewRow(initializeFormData());
        onAddClose();
    };

    const handleEditRow = () => {
        const updatedData = [...data];
        updatedData[editingRow.index] = editingRow.row;
        setData(updatedData);
        setEditingRow(null);
        onEditClose();
    };

    const handleDeleteRow = () => {
        setData(data.filter((_, index) => index !== deleteIndex));
        setDeleteIndex(null);
        onDeleteClose();
    };

    const handleRestoreRequest = () => {
        // Logic to restore the request
        // (Assume we change `cancelada` to false and update the state)
        const updatedData = [...data];
        updatedData[restoreIndex].cancelada = false;
        setData(updatedData);
        setRestoreIndex(null);
        onRestoreClose();
    };

    const renderInput = (header, value, onChange) => {
        if (header.inputType === 'select') {
            return (
                <Select value={value} onChange={onChange} isRequired>
                    {header.options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Select>
            );
        } else if (header.inputType === 'checkbox') {
            return (
                <Stack spacing={2} display='flex' flexDirection='row' p={2}>
                    {header.options.map(option => (
                        <Checkbox
                            key={option}
                            isChecked={value.includes(option)}
                            onChange={e => {
                                const newValue = e.target.checked
                                    ? [...value, option]
                                    : value.filter(val => val !== option);
                                onChange({ target: { value: newValue } });
                            }}
                        >
                            {option}
                        </Checkbox>
                    ))}
                </Stack>
            );
        } else if (header.inputType === 'checkbox-permissoes') {
            return (
                <Stack spacing={2} display='flex' flexDirection='column' p={2} w='208%'>
                    {header.options.map(option => (
                        <Flex key={option} alignItems='center'>
                            {option === 'Operar' && <Flex fontSize={12} fontWeight={500} alignItems='center'><DirectionsBoatFilledRounded sx={{ width: '16px', marginRight: '4px' }}/>Operar as funções básicas do line up, como o registro, edição e cancelamento de requisições.</Flex>}
                            {option === 'Editar' && <Flex fontSize={12} fontWeight={500} alignItems='center'><EditIcon sx={{ width: '16px', marginRight: '4px' }}/> Permitir a edição dos dados de berços e navios dentro do sistema.</Flex>}
                            {option === 'Visualizar' && <Flex fontSize={12} fontWeight={500} alignItems='center'><HistoryOutlined sx={{ width: '16px', marginRight: '4px' }}/> Visualizar o histórico de ações realizadas pelos usuários dentro do sistema.</Flex>}
                            {option === 'Admin' &&
                                <Flex flexDirection='column' mt={4}>
                                    <Flex fontSize={18} fontWeight={700}><AdminPanelSettingsOutlined sx={{ marginRight: '4px' }} />Modo administrador</Flex>
                                    <Text fontSize={12} pr={4} fontWeight={500}>Conceder controle total, permitindo a exclusão de dados do sistema, o cadastro de novos usuários e a edição de suas permissões.</Text>
                                </Flex>
                            }
                            <Switch
                                key={option}
                                isChecked={value.includes(option)}
                                onChange={e => {
                                    const newValue = e.target.checked
                                        ? [...value, option]
                                        : value.filter(val => val !== option);
                                    onChange({ target: { value: newValue } });
                                }}
                                ml='auto'
                                mt={option === 'Admin' ? '3rem' : 'none'}
                            >
                            </Switch>
                        </Flex>
                    ))}
                </Stack>
            );
        }
        return (
            <Input
                type={header.inputType || 'text'}
                value={value}
                onChange={onChange}
                isReadOnly={!header.editable}
                isRequired
            />
        );
    };

    function formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }

    return (
        <Box width='100%' overflowX='auto' height='85%'>
            {/*TOP MENU STACK*/}
            <Stack direction="row-reverse" position='absolute' top='0' right='0'>
                {/*PESQUISAR INPUT*/}
                <InputGroup width={250}>
                    <InputLeftElement>
                        <SearchIcon sx={{ color: 'gray' }} />
                    </InputLeftElement>
                    <Input type='search' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Pesquisar..." bg='white' mr='5px' />
                </InputGroup>

                {/* FILTRAR SELECT */}
                {filterOptions && (
                    <Select
                        placeholder={filterText}
                        onChange={(e) => setFilterValue(e.target.value)}
                        variant='outline'
                        colorScheme='blue'
                        border='1px solid #2b6cb0'
                        color='#2b6cb0'
                        fontWeight={500}
                        shadow='0 0px 1px hsla(0, 0%, 0%, 0.2), 0 1px 2px hsla(0, 0%, 0%, 0.2);'
                        width='auto'
                    >
                        {filterOptions.map((option) => (
                            <option key={option} value={option} style={{ color: 'black' }}>
                                {option}
                            </option>
                        ))}
                    </Select>
                )}

                <Button colorScheme='blue' variant="outline" display='flex' alignItems='center' width='auto' p={2}>
                    Exportar
                    <FileUploadIcon sx={{ marginLeft: '.25rem', fontSize: '1.25rem' }} />
                </Button>
            </Stack>

            {/* ZOOM SLIDER */}
            {!hideZoomSlider && <Box position='absolute' bottom='0' width='200px' display='flex' alignItems='center'>
            <Slider
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={zoom}
                    onChange={(value) => {
                        setZoom(value);
                    }}
                />
                <Box fontSize='10px' fontWeight='bold' ml={2}>
                    ZOOM
                </Box>
            </Box>}

            {showHeaderButton && <Button
                position="fixed"
                colorScheme="blue"
                h="2rem"
                top="1.5rem"
                right="5rem"
                shadow="none"
                onClick={onAddOpen}
            >
                Adicionar {page} +
            </Button>}

            {/* MAIN TABLE */}
            <Box transform={`scale(${zoom})`} transformOrigin="top left" key={zoom} mt={3} p='5px'>
                <Box id='table-container' w='125%' borderRadius='10px' overflow='hidden' boxShadow='0px 1px 3px 0px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.06)'>
                <Table variant="striped" size='md' colorScheme='gray' w='100%' bg='white' borderRadius='10px'>
                    <Thead>
                        <Tr>
                            {headers.map((header) => (
                                header.displayInTable && (
                                    <Th
                                        key={header.key}
                                        onClick={() => onSort(header.key)}
                                        style={{ cursor: 'pointer' }}
                                        p={5}
                                    >
                                        {header.label}
                                        {sortConfig.key === header.key ? (sortConfig.direction === 'ascending' ? ' ▼' : ' ▲') : ' ▸'}
                                    </Th>
                                )
                            ))}
                            {showButtons && <Th>Ações</Th>}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {filteredData.map((row, rowIndex) => (
                            <Tr key={rowIndex}>
                                {headers.map((header) => (
                                    header.displayInTable && (
                                        <Td key={header.key}>
                                            {header.inputType === 'datetime-local' ? formatDate(row[header.key]) : (header.inputType === 'checkbox' ? (
                                                <Stack spacing={1}>
                                                    {header.options.map(option => (
                                                        <Checkbox
                                                            key={option}
                                                            isChecked={row[header.key].includes(option)}
                                                            isReadOnly
                                                        >
                                                            {option}
                                                        </Checkbox>
                                                    ))}
                                                </Stack>
                                            ) : row[header.key])}
                                        </Td>
                                    )
                                ))}
                                {showButtons && <Td padding={0}>

                                    {showEditButton && <IconButton size="sm" colorScheme='blue' icon={<EditIcon />} ml={2} onClick={() => {
                                        setEditingRow({ index: rowIndex, row });
                                        onEditOpen();
                                    }}>Edit</IconButton>}

                                    { showDeleteButton && <IconButton size="sm" colorScheme="red" icon={<DeleteIcon />} ml={2} onClick={() => {
                                        setDeleteIndex(rowIndex);
                                        onDeleteOpen();
                                    }}>Delete</IconButton>}
                                    
                                    { showViewButton && <IconButton size="sm" colorScheme="blue" icon={<VisibilityIcon />} ml={2} onClick={() => {
                                        setEditingRow({ index: rowIndex, row });
                                        onViewOpen();
                                    }}>View</IconButton>}

                                    { showExportButton && <IconButton size="sm" colorScheme="blue" variant='outline' icon={<IosShareIcon />} ml={2} onClick={() => {
                                        console.log('exportar')
                                    }}>Export</IconButton>}

                                </Td>}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                </Box>
            </Box>

            {/* Modal Adicionar */}
            <Modal isOpen={isAddOpen} onClose={onAddClose}>
                <ModalOverlay />
                <ModalContent w='700px' maxW='100%'>
                    <ModalHeader>Adicionar {page}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexWrap='wrap' justifyContent='flex-start' >
                        {headers.map((header) => (
                            header.addModal && (
                                <FormControl key={header.key} mb={2} isRequired width='50%' marginBottom={5} pl={2} pr={2} overflow='visible'>
                                    <FormLabel>{header.label.toUpperCase()}</FormLabel>
                                    {renderInput(header, newRow[header.key], (e) => setNewRow({ ...newRow, [header.key]: e.target.value }))}
                                </FormControl>
                            )
                        ))}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleAddRow} isDisabled={!isAddValid}>Adicionar</Button>
                        <Button variant='outline' colorScheme='red' ml={2} onClick={onAddClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* Modal Editar */}
            <Modal isOpen={isEditOpen} onClose={onEditClose} size='2xl'>
                <ModalOverlay />
                <ModalContent w='700px' maxW='100%'>
                    <ModalHeader>Editar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexWrap='wrap' justifyContent='flex-start' >
                        {headers.map((header) => (
                            header.editModal && (
                                <FormControl key={header.key} mb={2} isRequired width='50%' marginBottom={5} pl={2} pr={2} overflow='visible'>
                                    <FormLabel>{header.label.toUpperCase()}</FormLabel>
                                    {renderInput(header, editingRow?.row[header.key] || initializeFormData()[header.key], (e) => setEditingRow({
                                        ...editingRow,
                                        row: { ...editingRow.row, [header.key]: e.target.value }
                                    }))}
                                </FormControl>
                            )
                        ))}
                    </ModalBody>
                    <Button ml={6} mr={6} variant='outline' colorScheme='blue'>Redefinir Senha</Button>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleEditRow} isDisabled={!isEditValid}>Salvar</Button>
                        <Button variant='outline' colorScheme='red' ml={2} onClick={onEditClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/* AlertDialog Confirmação Deletar */}
            <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={null}
                onClose={onDeleteClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Deletar
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Tem certeza? Esta ação não poderá ser desfeita.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onDeleteClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme="red" onClick={handleDeleteRow} ml={3}>
                                Deletar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* AlertDialog Confirmação Restaurar */}
            <AlertDialog
                isOpen={isRestoreOpen}
                leastDestructiveRef={null}
                onClose={onRestoreClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Restaurar Requisição
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Tem certeza que deseja restaurar esta requisição?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button onClick={onRestoreClose}>
                                Cancelar
                            </Button>
                            <Button colorScheme="blue" onClick={handleRestoreRequest} ml={3}>
                                Restaurar
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            {/* Modal Visualizar e Adicionar ao Line-up */}
            <Modal isOpen={isViewOpen} onClose={onViewClose} size='2xl'>
                <ModalOverlay />
                <ModalContent w='700px' maxW='100%'>
                    <ModalHeader>Requisição {editingRow?.row.cancelada ? "Cancelada" : ""} N° {editingRow?.row.imo}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display='flex' flexWrap='wrap' justifyContent='flex-start' >
                        <Tabs variant="line" width="100%" height='100%'>
                            <Stack direction="row" ml='5px'>
                                <TabList mb={5}>
                                    <Tab borderRadius="0" shadow="none" _hover={{ shadow: "none" }}>Informações do Pedido</Tab>
                                    <Tab borderRadius="0" shadow="none" _hover={{ shadow: "none" }}>Informações do Navio</Tab>
                                </TabList>
                            </Stack>
                            <TabPanels h='100%'>
                                <TabPanel p={0}>
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
        </Box>
    );
};

export default GenericTable;