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
    useDisclosure,
    Stack,
    Checkbox,
    Flex,
} from '@chakra-ui/react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import IosShareIcon from '@mui/icons-material/IosShare';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddModal from './AddModal';
import EditModal from './EditModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import RestoreConfirmationModal from './RestoreConfirmationModal';
import ViewModal from './ViewModal';
import InactivateUserModal from './InactivateUserModal';  // Import the new InactivateUserModal
import { formatDate } from './utils';

const GenericTable = ({ page, headers, data: initialData, filterOptions, filterKey, filterText, showButtons, showEditButton, showDeleteButton, showExportButton, showViewButton, showHeaderButton, hideZoomSlider }) => {
    const [zoom, setZoom] = useState(0.8);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
    const [filterValue, setFilterValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [data, setData] = useState(initialData);
    const [editingRow, setEditingRow] = useState(null);
    const [newRow, setNewRow] = useState(initializeFormData());
    const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
    const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
    const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
    const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
    const [deleteIndex, setDeleteIndex] = useState(null);
    const { isOpen: isRestoreOpen, onOpen: onRestoreOpen, onClose: onRestoreClose } = useDisclosure();
    const [restoreIndex, setRestoreIndex] = useState(null);
    const [userName, setUserName] = useState('');
    
    const { isOpen: isInactivateOpen, onOpen: onInactivateOpen, onClose: onInactivateClose } = useDisclosure();

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
        const updatedData = [...data];
        updatedData[restoreIndex].cancelada = false;
        setData(updatedData);
        setRestoreIndex(null);
        onRestoreClose();
    };

    const handleInactivateUser = (adminPassword) => {
        // INATIVAR USUÁRIO
        onInactivateClose();
    };

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
                onClick={ showHeaderButton==='lineup' ? onViewOpen : onAddOpen}
            >
                Registrar {page} +
            </Button>}

            {/* TABELA */}
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
                                        {showEditButton === 'lineup' ? onViewOpen() : onEditOpen()}
                                    }}>Edit</IconButton>}

                                    { showDeleteButton && <IconButton size="sm" colorScheme="red" icon={<DeleteIcon />} ml={2} onClick={() => {
                                        setDeleteIndex(rowIndex);
                                        setUserName(row.nome);
                                        { page === 'Usuário' ? onInactivateOpen() : onDeleteOpen();}
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

            {/* Modal Adicionar / Registrar */}
            <AddModal
                isAddOpen={isAddOpen}
                onAddClose={onAddClose}
                headers={headers}
                newRow={newRow}
                setNewRow={setNewRow}
                handleAddRow={handleAddRow}
                isAddValid={isAddValid}
                page={page}
            />

            {/* Modal Editar */}
            <EditModal
                isEditOpen={isEditOpen}
                onEditClose={onEditClose}
                headers={headers}
                editingRow={editingRow}
                setEditingRow={setEditingRow}
                handleEditRow={handleEditRow}
                isEditValid={isEditValid}
            />

            {/* AlertDialog Confirmação Deletar */}
            <DeleteConfirmationModal
                isDeleteOpen={isDeleteOpen}
                onDeleteClose={onDeleteClose}
                handleDeleteRow={handleDeleteRow}
            />

            {/* AlertDialog Confirmação Restaurar */}
            <RestoreConfirmationModal
                isRestoreOpen={isRestoreOpen}
                onRestoreClose={onRestoreClose}
                handleRestoreRequest={handleRestoreRequest}
            />

            {/* Modal Visualizar e Adicionar ao Line-up */}
            <ViewModal
                isViewOpen={isViewOpen}
                onViewClose={onViewClose}
                editingRow={editingRow}
                setRestoreIndex={setRestoreIndex}
                onRestoreOpen={onRestoreOpen}
            />

            {/* Modal Inativar Usuário */}
            <InactivateUserModal
                isInactivateOpen={isInactivateOpen}
                onInactivateClose={onInactivateClose}
                nome={userName}
                handleInactivateUser={handleInactivateUser}
            />
        </Box>
    );
};

export default GenericTable;