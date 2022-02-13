import {
  HStack,
  Heading,
  Container,
  Textarea,
  Flex,
  IconButton,
  Spacer,
  useColorMode
} from "@chakra-ui/react";
import {
  SunIcon,
  MoonIcon,
  DeleteIcon
} from '@chakra-ui/icons';
import useStateWithLocalStorage from "../hooks/use-state-with-local-storage";
import React from "react";

const Main = () => {

  type UseColorModeProps = {
    colorMode: 'light' | 'dark';
    toggleColorMode: () => void;
  };

  const {
    colorMode,
    toggleColorMode
  }: UseColorModeProps = useColorMode();

  const [notes, setNotes] = useStateWithLocalStorage('notes');

  return (
    <Container maxW={ 'container.xl' } py={ 4 }>
      <Flex align={ 'center' } justify={ 'center' } mb={ 4 }>
        <Heading>{ 'local-storage-notes' }</Heading>
        <Spacer />
        <HStack>
          <IconButton
            aria-label={ 'clear-notes' }
            onClick={ () => setNotes('') }
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
  );
};

export default Main;