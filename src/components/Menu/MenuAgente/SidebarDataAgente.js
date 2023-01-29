import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteRol, deleteSessionId } from '../../../utils/helper';


export const SidebarDataAgente = [
    {    
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/",
        onClick: () => {
            deleteSessionId()
            deleteRol()
        }
    }
]
