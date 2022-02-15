import { CopyIcon, DownloadIcon, DeleteIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Flex, Heading, Spacer, HStack, Tooltip, IconButton, useColorModeValue } from "@chakra-ui/react";

interface HeaderProps {
  handleCopyNotes: React.MouseEventHandler<HTMLButtonElement>;
  handleDownloadNotes: React.MouseEventHandler<HTMLButtonElement>;
  handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  toggleColorMode: () => void;
}

const Header = ({
  handleCopyNotes,
  handleDownloadNotes,
  handleDeleteButtonClick,
  toggleColorMode
}: HeaderProps) => {
  return (
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
  );
};

export default Header;