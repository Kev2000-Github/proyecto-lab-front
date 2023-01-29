import React from 'react';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteRol, deleteSessionId } from '../../../utils/helper';
import { logout } from '../../../services/session.service';
import { swalClose, swalLoading } from '../../../utils/swal';

export const SidebarData = [
    {
        title: "Medicinas",
        icon: <AddToQueueOutlinedIcon />,
        link: "/drugs",
        onClick: () => {}
    },
    {
        title: "Grupos",
        icon: <GroupsOutlinedIcon />,
        link: "/groups",
        onClick: () => {}
    },
    {
        title: "Sucursales",
        icon: <GroupsOutlinedIcon />,
        link: "/subsidiaries",
        onClick: () => {}
    },
    {
        title: "Reporte",
        icon: <AssessmentOutlinedIcon />,
        link: "/reporte",
        onClick: () => {}
    },
    {
        title: "Usuarios",
        icon: <PersonIcon />,
        link: "/users",
        onClick: () => {}
    },
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
            }
        }
    }
]
