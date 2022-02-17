import React from "react";
import {
  Container,
  useColorMode,
  useDisclosure,
  useClipboard,
  useToast
} from "@chakra-ui/react";
import useStateWithLocalStorage from "../hooks/use-state-with-local-storage";
import useDownloadTxt from "../hooks/use-download-txt";
import Header from "../components/Header";
import Notes from "../components/Notes";
import DeleteConfirmationModal from "../components/DeleteConfirmationModal";
import AboutModal from "../components/AboutModal";

const Main = () => {

  const [notes, setNotes] = useStateWithLocalStorage('notes');
  const { toggleColorMode } = useColorMode();
  const {
    isOpen: isDeleteConfirmationModalOpen,
    onOpen: onDeleteConfirmationModalOpen,
    onClose: onDeleteConfirmationModalClose
  } = useDisclosure();
  const {
    isOpen: isAboutModalOpen,
    onOpen: onAboutModalOpen,
    onClose: onAboutModalClose
  } = useDisclosure();
  const { onCopy: onCopyNotes } = useClipboard(notes);
  const { onDownload: onDownloadNotes } = useDownloadTxt(notes);
  const createToast = useToast();

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  };

  const handleCopyButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
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

  const handleDownloadButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
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
  const handleAboutButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onAboutModalOpen();
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
          handleCopyButtonClick={ handleCopyButtonClick }
          handleDownloadButtonClick={ handleDownloadButtonClick }
          handleDeleteButtonClick={ handleDeleteButtonClick }
          handleColorModeButtonClick={ toggleColorMode }
          handleAboutButtonClick={ handleAboutButtonClick }
        />
        <Notes
          notes={ notes }
          onNotesChange={ handleNotesChange }
        />
      </Container>
      <DeleteConfirmationModal
        isOpen={ isDeleteConfirmationModalOpen }
        onClose={ onDeleteConfirmationModalClose }
        confirmDelete={ handleDeleteNotes }
      />
      <AboutModal
        isOpen={ isAboutModalOpen }
        onClose={ onAboutModalClose }
      />
    </>
  );
};

export default Main;