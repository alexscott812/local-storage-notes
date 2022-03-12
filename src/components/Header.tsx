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
  onCopyButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onDownloadButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onDeleteButtonClick: React.MouseEventHandler<HTMLButtonElement>;
  onColorModeButtonClick: () => void;
  onAboutButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Header = ({
  hasNotes,
  onCopyButtonClick,
  onDownloadButtonClick,
  onDeleteButtonClick,
  onColorModeButtonClick,
  onAboutButtonClick
}: HeaderProps) => {
  return (
    <Flex align={'center'} justify={'center'}>
      <Heading>{'notes-js'}</Heading>
      <Spacer />
      <Box d={{ base: 'flex', sm: 'none' }}>
        <Menu computePositionOnMount>
          <Tooltip hasArrow label={'options'}>
            <MenuButton
              as={IconButton}
              aria-label={'options'}
              icon={<Text fontWeight={'bold'}>{'···'}</Text>}
            />
          </Tooltip>
          <MenuList>
            <MenuItem
              isDisabled={!hasNotes}
              icon={<CopyIcon />}
              onClick={onCopyButtonClick}
            >
              {'copy notes'}
            </MenuItem>
            <MenuItem
              isDisabled={!hasNotes}
              icon={<DownloadIcon />}
              onClick={onDownloadButtonClick}
            >
              {'download notes'}
            </MenuItem>
            <MenuItem
              isDisabled={!hasNotes}
              icon={<DeleteIcon />}
              onClick={onDeleteButtonClick}
            >
              {'delete notes'}
            </MenuItem>
            <MenuItem
              icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
              onClick={onColorModeButtonClick}
            >
              {`${useColorModeValue('dark', 'light')} mode`}
            </MenuItem>
            <MenuItem
              icon={<InfoOutlineIcon />}
              onClick={onAboutButtonClick}
            >
              {'about'}
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <ButtonGroup display={{ base: 'none', sm: 'flex' }}>
        <Tooltip hasArrow label={'copy notes'}>
          <IconButton
            isDisabled={!hasNotes}
            aria-label={'copy-notes'}
            onClick={onCopyButtonClick}
            icon={<CopyIcon />}
          />
        </Tooltip>
        <Tooltip hasArrow label={'download notes'}>
          <IconButton
            isDisabled={!hasNotes}
            aria-label={'download-notes'}
            onClick={onDownloadButtonClick}
            icon={<DownloadIcon />}
          />
        </Tooltip>
        <Tooltip hasArrow label={'delete notes'}>
          <IconButton
            isDisabled={!hasNotes}
            aria-label={'delete-notes'}
            onClick={onDeleteButtonClick}
            icon={<DeleteIcon />}
          />
        </Tooltip>
        <Tooltip hasArrow label={`${useColorModeValue('dark', 'light')} mode`}>
          <IconButton
            aria-label={'toggle-color-mode'}
            onClick={onColorModeButtonClick}
            icon={useColorModeValue(<MoonIcon />, <SunIcon />)}
          />
        </Tooltip>
        <Tooltip hasArrow label={'about'}>
          <IconButton
            aria-label={'about'}
            onClick={onAboutButtonClick}
            icon={<InfoOutlineIcon />}
          />
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
};

export default Header;