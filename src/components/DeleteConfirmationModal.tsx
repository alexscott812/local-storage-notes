import React, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  confirmDelete: React.MouseEventHandler<HTMLButtonElement>;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  confirmDelete
}: DeleteConfirmationModalProps) => {

  const cancelRef = useRef(null);

  return (
    <AlertDialog
      isOpen={ isOpen }
      leastDestructiveRef={ cancelRef }
      onClose={ onClose }
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize={ 'lg' } fontWeight={ 'bold' }>
            { 'delete notes' }
          </AlertDialogHeader>
          <AlertDialogBody>
            { 'are you sure you want to delete all of your notes?' }
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={ cancelRef } onClick={ onClose }>
              { 'cancel' }
            </Button>
            <Button colorScheme={ 'red' } onClick={ confirmDelete } ml={ 3 }>
              { 'delete' }
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
};

export default DeleteConfirmationModal;