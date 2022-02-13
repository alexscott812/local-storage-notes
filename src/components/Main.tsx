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
  useClipboard
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

  const { colorMode, toggleColorMode } = useColorMode();

  const {
    isOpen: isDeleteConfirmationModalOpen,
    onOpen: onDeleteConfirmationModalOpen,
    onClose: onDeleteConfirmationModalClose
  } = useDisclosure();

  const [notes, setNotes] = useStateWithLocalStorage('notes');

  const { onCopy } = useClipboard(notes);

  const handleDeleteNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNotes('');
    onDeleteConfirmationModalClose();
  };

  return (
    <>
      <Container maxW={ 'container.xl' } py={ 4 }>
        <Flex align={ 'center' } justify={ 'center' } mb={ 4 }>
          <Heading>{ 'local-storage-notes' }</Heading>
          <Spacer />
          <HStack>
            <IconButton
              aria-label={ 'copy-notes' }
              onClick={ onCopy }
              icon={ <CopyIcon /> }
            />
            <IconButton
              aria-label={ 'clear-notes' }
              onClick={ onDeleteConfirmationModalOpen }
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
          onChange={ (e: React.ChangeEvent<HTMLTextAreaElement>) => setNotes(e.target.value) }
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