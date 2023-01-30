import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteRol, deleteSessionId } from '../../../utils/helper';
import { swalClose, swalLoading } from '../../../utils/swal';
import { logout } from '../../../services/session.service';


export const SidebarDataAgente = [
    {    
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/",
        onClick: async (e, history) => {
            e.preventDefault()
            swalLoading()
            const resp = await logout()
            if(resp){
                deleteSessionId()
                deleteRol()
                swalClose()
                history.push('/')
            }        }
    }
]
