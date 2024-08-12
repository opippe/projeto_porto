import React from 'react';
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Stack,
    Switch,
} from "@chakra-ui/react";
import { AdminPanelSettingsOutlined, DirectionsBoatFilledRounded, HistoryOutlined } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';

const EditModal = ({ isEditOpen, onEditClose, headers, editingRow, setEditingRow, handleEditRow, isEditValid }) => {

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
                                    <Box fontSize={12} pr={4} fontWeight={500}>Conceder controle total, permitindo a exclusão de dados do sistema, o cadastro de novos usuários e a edição de suas permissões.</Box>
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

    return (
        <Modal isOpen={isEditOpen} onClose={onEditClose} size='2xl'>
            <ModalOverlay />
            <ModalContent w='700px' maxW='100%'>
                <ModalHeader>Editar</ModalHeader>
                <ModalCloseButton />
                <ModalBody display='flex' flexWrap='wrap' justifyContent='flex-start'>
                    {headers.map((header) => (
                        header.editModal && (
                            <FormControl key={header.key} mb={2} isRequired width='50%' marginBottom={5} pl={2} pr={2} overflow='visible'>
                                <FormLabel>{header.label.toUpperCase()}</FormLabel>
                                {renderInput(header, editingRow?.row[header.key] || '', (e) => setEditingRow({
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
    );
};

export default EditModal;