import React from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";

const RestoreConfirmationModal = ({ isRestoreOpen, onRestoreClose, handleRestoreRequest }) => {
    return (
        <AlertDialog isOpen={isRestoreOpen} leastDestructiveRef={null} onClose={onRestoreClose}>
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
    );
};

export default RestoreConfirmationModal;