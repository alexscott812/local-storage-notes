import React from "react";
import {
  Container,
  useColorMode,
  useDisclosure,
  useClipboard,
  useToast,
  VStack,
  Box
} from "@chakra-ui/react";
import useStateWithLocalStorage from "../hooks/use-state-with-local-storage";
import useDownloadTxt from "../hooks/use-download-txt";
import Header from "../components/Header";
import Notes from "../components/Notes";
import DeleteModal from "../components/DeleteModal";
import AboutModal from "../components/AboutModal";

const Main = () => {

  const [notes, setNotes] = useStateWithLocalStorage('notes');
  const { toggleColorMode } = useColorMode();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose
  } = useDisclosure();
  const {
    isOpen: isAboutModalOpen,
    onOpen: onAboutModalOpen,
    onClose: onAboutModalClose
  } = useDisclosure();
  const { onCopy: onCopyNotes } = useClipboard(notes);
  const { onDownload: onDownloadNotes } = useDownloadTxt(notes);
  const toast = useToast();

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  };

  const handleCopyButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onCopyNotes();
    const toastId = 'notes-copied';
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: 'notes copied to clipboard!',
        status: 'success',
        duration: 2500
      });
    }
  };

  const handleDownloadButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onDownloadNotes();
    const toastId = 'notes-downloaded';
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: 'notes downloaded!',
        status: 'success',
        duration: 2500
      });
    }
  };

  const handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onDeleteModalOpen();
  };
  const handleAboutButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    onAboutModalOpen();
  };

  const handleDeleteNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNotes('');
    onDeleteModalClose();
    const toastId = 'notes-deleted';
    if (!toast.isActive(toastId)) {
      toast({
        id: toastId,
        title: 'notes deleted!',
        status: 'success',
        duration: 2500
      });
    }
  };

  return (
    <>
      <Container maxW={'container.lg'} py={4} h={'100vh'}>
        <VStack align={'stretch'} h={'full'} spacing={4}>
          <Header 
            hasNotes={!!notes}
            onCopyButtonClick={handleCopyButtonClick}
            onDownloadButtonClick={handleDownloadButtonClick}
            onDeleteButtonClick={handleDeleteButtonClick}
            onColorModeButtonClick={toggleColorMode}
            onAboutButtonClick={handleAboutButtonClick}
          />
          <Box flex={1}>
            <Notes
              notes={notes}
              onNotesChange={handleNotesChange}
            />
          </Box>
        </VStack>
      </Container>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onConfirmDelete={handleDeleteNotes}
      />
      <AboutModal
        isOpen={isAboutModalOpen}
        onClose={onAboutModalClose}
      />
    </>
  );
};

export default Main;