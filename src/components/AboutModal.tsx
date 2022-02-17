import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  Text
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
          <Text>{ 'about the project' }</Text>
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