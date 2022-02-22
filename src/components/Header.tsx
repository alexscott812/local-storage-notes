import {
  CopyIcon,
  DownloadIcon,
  DeleteIcon,
  MoonIcon,
  SunIcon,
  InfoOutlineIcon
} from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  Spacer,
  Tooltip,
  IconButton,
  Text,
  Box,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  useColorModeValue,
  ButtonGroup
} from "@chakra-ui/react";

interface HeaderProps {
  hasNotes: boolean;
  handleCopyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleDownloadButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  handleColorModeButtonClick: () => void;
  handleAboutButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({
  hasNotes,
  handleCopyButtonClick,
  handleDownloadButtonClick,
  handleDeleteButtonClick,
  handleColorModeButtonClick,
  handleAboutButtonClick
}: HeaderProps) => {
  return (
    <Flex align={ 'center' } justify={ 'center' }>
      <Heading>{ 'notes-js' }</Heading>
      <Spacer />
      <Box d={{ base: 'flex', sm: 'none' }}>
        <Menu computePositionOnMount>
          <Tooltip hasArrow label={ 'options' }>
            <MenuButton
              as={ IconButton }
              aria-label={ 'options' }
              icon={ <Text fontWeight={ 'bold' }>{ '···' }</Text> }
            />
          </Tooltip>
          <MenuList>
            <MenuItem
              isDisabled={ !hasNotes }
              icon={ <CopyIcon /> }
              onClick={ handleCopyButtonClick }
            >
              { 'copy notes' }
            </MenuItem>
            <MenuItem
              isDisabled={ !hasNotes }
              icon={ <DownloadIcon /> }
              onClick={ handleDownloadButtonClick }
            >
              { 'download notes' }
            </MenuItem>
            <MenuItem
              isDisabled={ !hasNotes }
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
            <MenuItem
              icon={ <InfoOutlineIcon /> }
              onClick={ handleAboutButtonClick }
            >
              { 'about' }
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <ButtonGroup display={{ base: 'none', sm: 'flex' }}>
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
        <Tooltip hasArrow label={ 'about' }>
          <IconButton
            aria-label={ 'about' }
            onClick={ handleAboutButtonClick }
            icon={ <InfoOutlineIcon /> }
          />
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;