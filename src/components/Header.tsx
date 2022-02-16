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
  handleCopyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleDownloadButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleColorModeButtonClick: () => void;
}

const Header = ({
  hasNotes,
  handleCopyButtonClick,
  handleDownloadButtonClick,
  handleDeleteButtonClick,
  handleColorModeButtonClick
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
              onClick={ handleCopyButtonClick }
            >
              { 'copy notes' }
            </MenuItem>
            <MenuItem
              icon={ <DownloadIcon /> }
              onClick={ handleDownloadButtonClick }
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
              onClick={ handleColorModeButtonClick }
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
            onClick={ handleCopyButtonClick }
            icon={ <CopyIcon /> }
          />
        </Tooltip>
        <Tooltip hasArrow label={ 'download notes' }>
          <IconButton
            isDisabled={ !hasNotes }
            aria-label={ 'download-notes' }
            onClick={ handleDownloadButtonClick }
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
            onClick={ handleColorModeButtonClick }
            icon={ useColorModeValue(<MoonIcon />, <SunIcon />) }
          />
        </Tooltip>
      </HStack>
    </Flex>
  );
};

export default Header;