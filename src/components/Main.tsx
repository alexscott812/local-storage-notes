import React from "react";
import {
  HStack,
  Heading,
  Container,
  Textarea,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
  useColorMode,
  useDisclosure,
  useClipboard,
  useToast,
  useColorModeValue
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

  const { toggleColorMode } = useColorMode();

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
        duration: 2500,
        isClosable: false
      });
    } else {
      toast({
        title: 'no notes to copy!',
        status: 'warning',
        duration: 2500,
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
    } else {
      toast({
        title: 'no notes to delete!',
        status: 'warning',
        duration: 2500,
        isClosable: false
      });
    }
  };

  const handleDeleteNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNotes('');
    onDeleteConfirmationModalClose();
    toast({
      title: 'notes deleted!',
      status: 'success',
      duration: 2500,
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
            <Tooltip label={ 'copy notes' }>
              <IconButton
                aria-label={ 'copy-notes' }
                onClick={ handleCopyLink }
                icon={ <CopyIcon /> }
              />
            </Tooltip>
            <Tooltip label={ 'delete notes' }>
              <IconButton
                aria-label={ 'delete-notes' }
                onClick={ handleDeleteButtonClick }
                icon={ <DeleteIcon /> }
              />
            </Tooltip>
            <Tooltip label={ `${useColorModeValue('dark', 'light')} mode` }>
              <IconButton
                aria-label={ 'toggle-color-mode' }
                onClick={ toggleColorMode }
                icon={ useColorModeValue(<MoonIcon />, <SunIcon />) }
              />
            </Tooltip>
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