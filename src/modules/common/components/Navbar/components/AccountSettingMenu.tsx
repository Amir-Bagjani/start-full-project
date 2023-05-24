import {
  Box,
  Menu,
  Stack,
  Avatar,
  Drawer,
  Switch,
  Tooltip,
  Divider,
  MenuItem,
  IconButton,
  Typography,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MouseEvent, memo, useCallback, useState } from 'react';

// import { IoExit, IoExitOutline } from 'react-icons/io5';

//components
import { MdLogout, MdScreenshotMonitor, MdRefresh } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';

//utils
import { ROUTES_NAME } from 'routes/routesName';
import { useModal, useSettings, useUser } from 'modules/common/hooks';
import { ColorPresetSettings } from './ColorPresetSettings';

export const AccountSettingMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, logout } = useUser();
  const { resetSettings } = useSettings();

  //theme settings
  const { isOpen, onToggle } = useModal();

  //menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = useCallback((event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Tooltip title={t('NavAccSettings')}>
        <Stack spacing={0.5} direction='row' alignItems='center'>
          <Stack spacing={0.1}>
            {!!user?.first_name && (
              <Typography noWrap variant='subtitle1'>
                {user.first_name + ' ' + user.last_name}
              </Typography>
            )}
            <Typography variant='subtitle2' noWrap>
              {user?.username}
            </Typography>
          </Stack>
          <IconButton onClick={handleOpenMenu} size='medium'>
            <Avatar />
          </IconButton>
        </Stack>
      </Tooltip>

      {/* navbar account menu */}
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={openMenu}
        onClose={handleCloseMenu}
        PaperProps={{
          elevation: 0,
          sx: styles.menuPaper,
        }}
      >
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            navigate(ROUTES_NAME.profile);
          }}
        >
          <Avatar>A</Avatar>
          {t('NavMenProfile')}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleCloseMenu();
            onToggle();
          }}
        >
          <ListItemIcon>
            <MdScreenshotMonitor size={24} />
          </ListItemIcon>
          {t('NavMenuSetting')}
        </MenuItem>
        <ToggleThemeMode />
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <MdLogout size={24} />
          </ListItemIcon>
          {t('NavbarExit')}
        </MenuItem>
      </Menu>

      {/* display settings drawer */}
      <CustomDrawer
        variant='temporary'
        anchor='left'
        open={isOpen}
        onClose={onToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <Stack direction='row' spacing={0} p={2} alignItems='center'>
          <Tooltip title={t('NavbarExit')}>
            <IconButton onClick={onToggle}>
              <IoClose />
            </IconButton>
          </Tooltip>
          <Tooltip title={t('NavbarRefresh')} sx={{ marginInlineEnd: 'auto' }}>
            <IconButton onClick={resetSettings}>
              <MdRefresh />
            </IconButton>
          </Tooltip>
          <Typography variant='subtitle1'>{t('NavMenuSetting')}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box p={2}>
          <Typography variant='subtitle2' mb={2}>
            {t('NavMenuColorPalette')}
          </Typography>
          <ColorPresetSettings />
        </Box>
      </CustomDrawer>
    </div>
  );
};

const ToggleThemeMode = memo(() => {
  const { t } = useTranslation();
  const { toggleTheme, themeMode } = useSettings();

  return (
    <MenuItem
      //  onClick={toggleTheme}
      disableRipple
      disableTouchRipple
      disableGutters
    >
      <ListItemIcon sx={{ marginInlineStart: 1 }}>
        {/* <MdScreenshotMonitor size={24} /> */}
        <Switch checked={themeMode === 'dark'} onChange={toggleTheme} />
      </ListItemIcon>
      {t('NavMenuDark')}
    </MenuItem>
  );
});

const CustomDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: 290,
    // right: 'unset !important',
    right: 0,
    left: 'unset',
    margin: theme.spacing(2),
    borderRadius: theme.spacing(2),
    maxHeight: `calc(100vh - ${theme.spacing(4)})`,
    backgroundColor: theme.palette.background.neutral,
  },
}));

const styles = {
  menuPaper: {
    bgcolor: 'background.neutral',
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
    minWidth: 200,
    mt: 0.5,
    '& .MuiAvatar-root': {
      marginInlineEnd: 3,
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 22,
      width: 10,
      height: 10,
      bgcolor: 'background.neutral',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
};
