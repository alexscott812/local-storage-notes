import React, { MouseEventHandler, useContext } from "react";
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
  CopyIcon,
  DownloadIcon
} from '@chakra-ui/icons';
import useStateWithLocalStorage from "../hooks/use-state-with-local-storage";
import useDownloadTxt from "../hooks/use-download-txt";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

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

  const handleCopyNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (notes) {
      onCopyNotes();
      createToast({
        title: 'notes copied to clipboard!',
        status: 'success',
        duration: 2500,
        isClosable: true
      });
    } else {
      createToast({
        title: 'no notes to copy!',
        status: 'warning',
        duration: 2500,
        isClosable: true
      });
    }
  };

  const handleDownloadNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (notes) {
      onDownloadNotes();
      createToast({
        title: 'notes downloaded!',
        status: 'success',
        duration: 2500,
        isClosable: true
      });
    } else {
      createToast({
        title: 'no notes to download!',
        status: 'warning',
        duration: 2500,
        isClosable: true
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
      createToast({
        title: 'no notes to delete!',
        status: 'warning',
        duration: 2500,
        isClosable: true
      });
    }
  };

  const handleDeleteNotes: React.MouseEventHandler<HTMLButtonElement> = () => {
    setNotes('');
    onDeleteConfirmationModalClose();
    createToast({
      title: 'notes deleted!',
      status: 'success',
      duration: 2500,
      isClosable: true
    });
  };

  return (
    <>
      <Container maxW={ 'container.xl' } py={ 4 }>
        <Flex align={ 'center' } justify={ 'center' } mb={ 4 }>
          <Heading>{ 'notes-js' }</Heading>
          <Spacer />
          <HStack>
            <Tooltip hasArrow label={ 'copy notes' }>
              <IconButton
                aria-label={ 'copy-notes' }
                onClick={ handleCopyNotes }
                icon={ <CopyIcon /> }
              />
            </Tooltip>
            <Tooltip hasArrow label={ 'download notes' }>
              <IconButton
                aria-label={ 'download-notes' }
                onClick={ handleDownloadNotes }
                icon={ <DownloadIcon /> }
              />
            </Tooltip>
            <Tooltip hasArrow label={ 'delete notes' }>
              <IconButton
                aria-label={ 'delete-notes' }
                onClick={ handleDeleteButtonClick }
                icon={ <DeleteIcon /> }
              />
            </Tooltip>
            <Tooltip hasArrow label={ `${useColorModeValue('dark', 'light')} mode` }>
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