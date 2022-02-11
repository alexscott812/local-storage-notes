import {
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
  MoonIcon
} from '@chakra-ui/icons';

const Main = () => {

  type UseColorModeProps = {
    colorMode: 'light' | 'dark';
    toggleColorMode: () => void;
  };

  const {
    colorMode,
    toggleColorMode
  }: UseColorModeProps = useColorMode();

  return (
    <Container maxW={ 'container.xl' } py={ 4 }>
      <Flex align={ 'center' } justify={ 'center' } mb={ 4 }>
        <Heading>{ 'local-storage-notes' }</Heading>
        <Spacer />
        <IconButton
          aria-label={ 'toggle-color-mode' }
          onClick={ toggleColorMode }
          icon={ colorMode === 'light' ? <MoonIcon /> : <SunIcon /> }
        />
      </Flex>
      <Textarea size={ 'lg' }/>
    </Container>
  );
};

export default Main;