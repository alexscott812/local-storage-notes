import React from "react";
import {
  Container,
  Textarea,
  useColorMode,
  useDisclosure,
  useClipboard,
  useToast
} from "@chakra-ui/react";
import useStateWithLocalStorage from "../hooks/use-state-with-local-storage";
import useDownloadTxt from "../hooks/use-download-txt";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import Header from "./Header";

const Main = () => {

  const [notes, setNotes] = useStateWithLocalStorage('notes');
  const { toggleColorMode } = useColorMode();
  const {
    isOpen: isDeleteConfirmationModalOpen,
    onOpen: onDeleteConfirmationModalOpen,
    onClose: onDeleteConfirmationModalClose
  } = useDisclosure();
  const { onCopy: onCopyNotes } = useClipboard(notes);
  const { onDownload: onDownloadNotes } = useDownloadTxt(notes);
  const createToast = useToast();

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  };

  const handleCopyNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (notes) {
      onCopyNotes();
      createToast({
        title: 'notes copied to clipboard!',
        status: 'success',
        duration: 2500
      });
    } else {
      createToast({
        title: 'no notes to copy!',
        status: 'warning',
        duration: 2500
      });
    }
  };

  const handleDownloadNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (notes) {
      onDownloadNotes();
      createToast({
        title: 'notes downloaded!',
        status: 'success',
        duration: 2500
      });
    } else {
      createToast({
        title: 'no notes to download!',
        status: 'warning',
        duration: 2500
      });
    }
  };

  const handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (notes) {
      onDeleteConfirmationModalOpen();
    } else {
      createToast({
        title: 'no notes to delete!',
        status: 'warning',
        duration: 2500
      });
    }
  };

  const handleDeleteNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNotes('');
    onDeleteConfirmationModalClose();
    createToast({
      title: 'notes deleted!',
      status: 'success',
      duration: 2500
    });
  };

  return (
    <>
      <Container maxW={ 'container.xl' } py={ 4 }>
        <Header 
          hasNotes={ !!notes }
          handleCopyNotes={ handleCopyNotes }
          handleDownloadNotes={ handleDownloadNotes }
          handleDeleteButtonClick={ handleDeleteButtonClick }
          toggleColorMode={ toggleColorMode }
        />
        <Textarea
          variant={ 'filled' }
          size={ 'lg' }
          minH={ 'lg' }
          value={ notes }
          onChange={ handleNotesChange }
          placeholder={ 'type your notes here...' }
        />
      </Container>
      <DeleteConfirmationModal
        isOpen={ isDeleteConfirmationModalOpen }
        onClose={ onDeleteConfirmationModalClose }
        confirmDelete={ handleDeleteNotes }
      />
    </>
  );
};

export default Main;