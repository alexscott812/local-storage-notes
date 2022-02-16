import {
  CopyIcon,
  DownloadIcon,
  DeleteIcon,
  MoonIcon,
  SunIcon
} from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Spacer,
  HStack,
  Tooltip,
  IconButton,
  Text,
  Box,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  useColorModeValue
} from "@chakra-ui/react";

interface HeaderProps {
  hasNotes: boolean;
  handleCopyNotes: React.MouseEventHandler<HTMLButtonElement>;
  handleDownloadNotes: React.MouseEventHandler<HTMLButtonElement>;
  handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  toggleColorMode: () => void;
}

const Header = ({
  hasNotes,
  handleCopyNotes,
  handleDownloadNotes,
  handleDeleteButtonClick,
  toggleColorMode
}: HeaderProps) => {
  return (
    <Flex align={ 'center' } justify={ 'center' } mb={ 4 }>
      <Heading>{ 'notes-js' }</Heading>
      <Spacer />
      <Box d={{ base: 'flex', sm: 'none' }}>
        <Menu>
          <MenuButton
            as={ IconButton }
            aria-label={ 'options' }
            icon={ <Text fontWeight={ 'bold' }>{ '···' }</Text> }
          />
          <MenuList>
            <MenuItem
              icon={ <CopyIcon /> }
              onClick={ handleCopyNotes }
            >
              { 'copy notes' }
            </MenuItem>
            <MenuItem
              icon={ <DownloadIcon /> }
              onClick={ handleDownloadNotes }
            >
              { 'download notes' }
            </MenuItem>
            <MenuItem
              icon={ <DeleteIcon /> }
              onClick={ handleDeleteButtonClick }
            >
              { 'delete notes' }
            </MenuItem>
            <MenuItem
              icon={ useColorModeValue(<MoonIcon />, <SunIcon />) }
              onClick={ toggleColorMode }
            >
              { `${useColorModeValue('dark', 'light')} mode` }
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <HStack display={{ base: 'none', sm: 'flex' }}>
        <Tooltip hasArrow label={ 'copy notes' }>
          <IconButton
            isDisabled={ !hasNotes }
            aria-label={ 'copy-notes' }
            onClick={ handleCopyNotes }
            icon={ <CopyIcon /> }
          />
        </Tooltip>
        <Tooltip hasArrow label={ 'download notes' }>
          <IconButton
            isDisabled={ !hasNotes }
            aria-label={ 'download-notes' }
            onClick={ handleDownloadNotes }
            icon={ <DownloadIcon /> }
          />
        </Tooltip>
        <Tooltip hasArrow label={ 'delete notes' }>
          <IconButton
            isDisabled={ !hasNotes }
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