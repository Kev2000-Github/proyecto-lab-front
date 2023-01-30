import React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar from '@mui/material/AppBar';
import "./menuGeneral.scss";
import { SidebarData } from './MenuAdmin/SidebarData';
import { SidebarDataAgente } from './MenuAgente/SidebarDataAgente'
import { PerfilUsuario } from "./MenuAdmin/PerfilUsuario";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { PerfilAgente } from './MenuAgente/PerfilAgente';
import { roles } from '../../utils/constants';
import { getUser } from '../../utils/helper';

export function Sidebar({ type }) {
    const location = useLocation()
    const history = useHistory()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
      setOpen(true);
    };

    const handleDrawerClose = () => {
      setOpen(false);
    };
    
    return (
      <div className='Sidebar'>
      <Box>
        <AppBar
          sx={{width: 1}}
          className='AppBar' 
          position="fixed"
          open={open}>
          <Navbar onOpenDrawer={handleDrawerOpen} />
        </AppBar>
        <Drawer
          className='drawer'
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader className='DrawerHeader'>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <ul className='SidebarList'>   
          {(type === roles.ADMIN? SidebarData : SidebarDataAgente)
              .map((val, key) => {
                  return (
                  <Link key={key} onClick={(e) => val.onClick(e, history)} to={val.link}>
                  <li 
                      className={`
                          row 
                          ${location.pathname === val.link ? "active": ""}
                      `}
                  >   
                      <div className='icon'>
                      {val.icon}
                      </div> 
                      <div className='title nameDetail'>
                      {val.title}
                      </div>
                  </li>
                  </Link>
              );
              })}
          
          </ul>          
            {
              getUser()?.subsidiary?
              <PerfilAgente/>
              :
              <PerfilUsuario/>
            }            
        </Drawer>
      </Box>
    </div>
    )
}

const Navbar = ({ onOpenDrawer }) => {
  return (
    <Toolbar className='Toolbar'>
      <IconButton
        color="black"
        aria-label="open drawer"
        onClick={onOpenDrawer}
        edge="start"
      >
        <MenuIcon />
      </IconButton>        
    </Toolbar>
  )
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));