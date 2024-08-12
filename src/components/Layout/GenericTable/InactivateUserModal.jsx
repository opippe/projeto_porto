// InactivateUserModal.js
import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Button,
    Text,
} from '@chakra-ui/react';

const InactivateUserModal = ({ isInactivateOpen, onInactivateClose, nome, handleInactivateUser }) => {
    const [adminPassword, setAdminPassword] = useState('');

    const isButtonDisabled = adminPassword.trim() === '';

    return (
        <Modal isOpen={isInactivateOpen} onClose={onInactivateClose}>
            <ModalOverlay />
            <ModalContent w='700px' maxW='100%'>
                <ModalHeader>Deseja inativar o usuário {nome}?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        Você está tentando inativar o usuário {nome}. Para concluir sua ação, é necessário inserir sua senha de administrador.
                    </Text>
                    <FormControl mt={4}>
                        <FormLabel>Senha de Administrador</FormLabel>
                        <Input
                            type="password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            placeholder="Digite sua senha"
                        />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button variant="outline" colorScheme="red" onClick={onInactivateClose}>
                        Cancelar
                    </Button>
                    <Button
                        colorScheme="blue"
                        ml={3}
                        onClick={() => handleInactivateUser(adminPassword)}
                        isDisabled={isButtonDisabled}
                    >
                        Inativar o Usuário
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default InactivateUserModal;