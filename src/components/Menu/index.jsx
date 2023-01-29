import React from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CssBaseline from '@mui/material/CssBaseline';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import "./menuGeneral.scss";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { SidebarData } from './MenuAdmin/SidebarData';
import { SidebarDataAgente } from './MenuAgente/SidebarDataAgente'
import { PerfilUsuario } from "./MenuAdmin/PerfilUsuario";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { PerfilAgente } from './MenuAgente/PerfilAgente';
import { roles } from '../../utils/constants';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

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
    
    return <div className='Sidebar'>
         <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className='AppBar' position="fixed" open={open}>
        <Toolbar className='Toolbar'>
            
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>        
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader className='DrawerHeader'>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />        
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
                    <div className='title'>
                    {val.title}
                    </div>
                </li>
                </Link>
            );
            })}
        
        </ul>          
          {
        type === roles.ADMIN?
        <PerfilUsuario/>
        :
        <PerfilAgente/>
      }            
      </Drawer>
      </Box>
    </div>
}