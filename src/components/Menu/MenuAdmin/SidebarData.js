import React from 'react';
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import { deleteRol, deleteSessionId } from '../../../utils/helper';

export const SidebarData = [
    {
        title: "Medicinas",
        icon: <AddToQueueOutlinedIcon />,
        link: "/medicinas",
        onClick: () => {}
    },
    {
        title: "Grupos",
        icon: <GroupsOutlinedIcon />,
        link: "/grupos",
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
        link: "/usuarios",
        onClick: () => {}
    },
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
