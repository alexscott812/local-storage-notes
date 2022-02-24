import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text,
  ListItem,
  UnorderedList,
  Link,
  useColorModeValue,
  chakra
} from '@chakra-ui/react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal = ({
  isOpen,
  onClose
}: AboutModalProps) => {
  return (
    <Modal isOpen={ isOpen } onClose={ onClose }>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ 'about' }</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={ 2 }>
            <chakra.span fontWeight={ 'semibold' }>{ 'notes-js' }</chakra.span>
            { ' is a notepad web app with offline capabilities.' }
          </Text>
          <Text mb={ 2 }>{ 'features:' }</Text>
          <UnorderedList mb={ 4 }>
            <ListItem>{ `notes persisted to browser's local storage` }</ListItem>
            <ListItem>{ 'notes synced across multiple browser tabs' }</ListItem>
            <ListItem>{ 'copy and download notes' }</ListItem>
            <ListItem>{ 'dark mode support' }</ListItem>
            <ListItem>
              <Link href={ 'https://github.com/alexscott812/notes-js' } isExternal>
              { 'open-source' }
              </Link>
            </ListItem>
          </UnorderedList>
          <Text align={ 'center' }>
            { '🛠 made by ' }
            <Link
              color={ useColorModeValue('purple.500', 'purple.200') }
              fontWeight={ 'semibold' }
              href={ 'https://github.com/alexscott812' }
              isExternal
            >
              { 'alex scott' }
            </Link>
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={ onClose }>
            { 'close' }
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;