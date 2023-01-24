import React from 'react';
import "./index.scss";
import AddToQueueOutlinedIcon from '@mui/icons-material/AddToQueueOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const SidebarData = [
    {
        title: "Medicinas",
        icon: <AddToQueueOutlinedIcon />,
        link: "/medicinas"

    },
    {
        title: "Grupos",
        icon: <GroupsOutlinedIcon />,
        link: "/grupos"

    },
    {
        title: "Reporte",
        icon: <AssessmentOutlinedIcon />,
        link: "/reporte"

    },
    {
        title: "Usuarios",
        icon: <PersonIcon />,
        link: "/usuarios"

    },
    {    
        title: "Logout",
        icon: <LogoutIcon />,
        link: "/logout"

    }
]
