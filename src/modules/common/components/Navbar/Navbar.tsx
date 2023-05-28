import {
  Box,
  Menu,
  List,
  Stack,
  AppBar,
  Divider,
  Toolbar,
  ListItem,
  Collapse,
  Container,
  IconButton,
  Typography,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MouseEvent, useCallback, useState } from 'react';

//components
import {
  LogoImg,
  CustomLink,
  LogoSection,
  CustomDrawer,
  RouteSection,
  CustomMenuItem,
} from './components/Styles';
import { TfiMenu } from 'react-icons/tfi';
import { AccountSettingMenu, HideOnScroll } from './components';

//utils
import { NAVBAR_MENU } from './utils';
import { OTHER_OPTIONS } from './utils/OtherOptions';
import { useRole, useUser, useModal as useMenu } from 'modules/common/hooks';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user } = useUser();
  const { includedRole } = useRole();

  const { isOpen: openCollapse, onToggle: toggleCollapse } = useMenu();
  const { isOpen: mobileOpen, onToggle: handleDrawerToggle } = useMenu();

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
    <>
      <HideOnScroll>
        <Box sx={{ flexGrow: 1, boxShadow: 1 }}>
          <AppBar sx={{ bgcolor: 'background.paper' }}>
            <Toolbar sx={{ color: 'text.primary', height: 85 }}>
              <Container
                sx={{
                  display: 'flex',
                  maxWidth: '1366px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative',
                }}
              >
                <Box sx={{ minWidth: 'max-content', display: { zero: 'block', lgLaptop: 'none' } }}>
                  <IconButton onClick={handleDrawerToggle}>
                    <TfiMenu />
                  </IconButton>
                </Box>

                <Stack
                  direction='row'
                  spacing={0.5}
                  sx={{ display: { zero: 'none', lgLaptop: 'flex' } }}
                >
                  {NAVBAR_MENU.map((i) => {
                    if (includedRole(i.roles)) {
                      if (i.key === 'more') {
                        return (
                          <RouteSection onClick={handleOpenMenu} key={i.id}>
                            <CustomMenuItem>{i.title}</CustomMenuItem>
                          </RouteSection>
                        );
                      }
                      if (i.key === 'expense') {
                        if (!user?.ExpenseRegistrationIsAllowed) return null;
                        return (
                          <RouteSection key={i.id}>
                            <CustomLink to={i.path as string}>{i.title}</CustomLink>
                          </RouteSection>
                        );
                      }
                      return (
                        <RouteSection key={i.id}>
                          <CustomLink to={i.path as string}>{i.title}</CustomLink>
                        </RouteSection>
                      );
                    } else {
                      return null;
                    }
                  })}
                </Stack>

                <LogoSection>
                  <LogoImg component='img' alt='logo' src='/images/iranianLogo.svg' />
                </LogoSection>

                <AccountSettingMenu />
              </Container>
            </Toolbar>
          </AppBar>
        </Box>
      </HideOnScroll>
      <div style={{ height: 95, width: '100%' }} />

      {/* mobile drawer */}
      <Box component='nav'>
        <CustomDrawer
          variant='temporary'
          anchor='right'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Box
              sx={{ width: 80, height: 80, m: 'auto' }}
              component='img'
              alt='logo'
              src='/images/iranianLogo.svg'
            />
            <Typography variant='subtitle2' component='h2' sx={{ fontWeight: 900, mb: 3 }}>
              {t('NavbarBrand')}
            </Typography>
            <Divider />
            <List>
              {NAVBAR_MENU.map((i) => {
                if (includedRole(i.roles)) {
                  if (i.key === 'more') {
                    return (
                      <ListItem disablePadding key={i.id}>
                        <CustomMenuItem
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCollapse();
                          }}
                        >
                          <ListItemButton>
                            <ListItemIcon sx={{ fontSize: '24px' }}>{i.icon}</ListItemIcon>
                            <ListItemText primary={i.title} />
                          </ListItemButton>
                        </CustomMenuItem>
                      </ListItem>
                    );
                  }
                  if (i.key === 'expense') {
                    if (!user?.ExpenseRegistrationIsAllowed) return null;
                    return (
                      <ListItem disablePadding key={i.id}>
                        <CustomLink to={i.path as string}>
                          <ListItemButton>
                            <ListItemIcon sx={{ fontSize: '24px' }}>{i.icon}</ListItemIcon>
                            <ListItemText primary={i.title} />
                          </ListItemButton>
                        </CustomLink>
                      </ListItem>
                    );
                  }
                  return (
                    <ListItem disablePadding key={i.id}>
                      <CustomLink to={i.path as string}>
                        <ListItemButton>
                          <ListItemIcon sx={{ fontSize: '24px' }}>{i.icon}</ListItemIcon>
                          <ListItemText primary={i.title} />
                        </ListItemButton>
                      </CustomLink>
                    </ListItem>
                  );
                } else {
                  return null;
                }
              })}
              <Collapse in={openCollapse}>
                <Stack spacing={0.5} sx={{ p: 0, paddingInlineStart: 5 }}>
                  {OTHER_OPTIONS.map((option) => (
                    <ListItem disablePadding key={option.id}>
                      <NavLink to={option.path} style={{ width: '100%' }}>
                        <ListItemButton>
                          <ListItemIcon sx={{ fontSize: '24px' }}>{option.icon}</ListItemIcon>
                          <ListItemText primary={option.title} />
                        </ListItemButton>
                      </NavLink>
                    </ListItem>
                  ))}
                </Stack>
              </Collapse>
            </List>
            <Divider />
          </Box>
        </CustomDrawer>
      </Box>

      {/* more menu -- desktop */}
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        sx={{ '& .MuiMenu-paper': { borderRadius: 1.5, bgcolor: 'background.neutral' } }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Stack spacing={0.5} sx={{ px: 1 }}>
          {OTHER_OPTIONS.map((option) => (
            <ListItem disablePadding onClick={handleCloseMenu} key={option.id}>
              <NavLink to={option.path} style={{ width: '100%' }}>
                <ListItemButton sx={{ '&:hover': { borderRadius: 1 } }}>
                  <ListItemIcon sx={{ fontSize: '24px' }}>{option.icon}</ListItemIcon>
                  <ListItemText primary={option.title} />
                </ListItemButton>
              </NavLink>
            </ListItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};
