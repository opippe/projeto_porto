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

const DeleteConfirmationModal = ({ isDeleteOpen, onDeleteClose, handleDeleteRow }) => {
    return (
        <AlertDialog isOpen={isDeleteOpen} leastDestructiveRef={null} onClose={onDeleteClose}>
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
    );
};

export default DeleteConfirmationModal;