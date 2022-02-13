import React from "react";
import {
  HStack,
  Heading,
  Container,
  Textarea,
  Flex,
  IconButton,
  Spacer,
  useColorMode,
  useDisclosure,
  useClipboard,
  useToast
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  DeleteIcon,
  CopyIcon
} from '@chakra-ui/icons';
import useStateWithLocalStorage from "../hooks/use-state-with-local-storage";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

const Main = () => {

  const [notes, setNotes] = useStateWithLocalStorage('notes');

  const { colorMode, toggleColorMode } = useColorMode();

  const {
    isOpen: isDeleteConfirmationModalOpen,
    onOpen: onDeleteConfirmationModalOpen,
    onClose: onDeleteConfirmationModalClose
  } = useDisclosure();

  const { onCopy } = useClipboard(notes);

  const toast = useToast();

  const handleCopyLink: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (notes) {
      onCopy();
      toast({
        title: 'notes copied to clipboard!',
        status: 'success',
        duration: 5000,
        isClosable: false
      });
    }
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
  };

  const handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (notes) {
      onDeleteConfirmationModalOpen();
    }
  };

  const handleDeleteNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNotes('');
    onDeleteConfirmationModalClose();
    toast({
      title: 'notes deleted!',
      status: 'success',
      duration: 5000,
      isClosable: false
    });
  };

  return (
    <>
      <Container maxW={ 'container.xl' } py={ 4 }>
        <Flex align={ 'center' } justify={ 'center' } mb={ 4 }>
          <Heading>{ 'notes-js' }</Heading>
          <Spacer />
          <HStack>
            <IconButton
              aria-label={ 'copy-notes' }
              onClick={ handleCopyLink }
              icon={ <CopyIcon /> }
            />
            <IconButton
              aria-label={ 'delete-notes' }
              onClick={ handleDeleteButtonClick }
              icon={ <DeleteIcon /> }
            />
            <IconButton
              aria-label={ 'toggle-color-mode' }
              onClick={ toggleColorMode }
              icon={ colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }
            />
          </HStack>
        </Flex>
        <Textarea
          variant={ 'filled' }
          size={ 'lg' }
          minH={ 'lg' }
          value={ notes }
          onChange={ handleNotesChange }
          placeholder={ 'type your notes here!' }
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