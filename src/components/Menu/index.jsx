import React from 'react';

import "./menuGeneral.scss";
import { SidebarData } from './MenuAdmin/SidebarData';
import { SidebarDataAgente } from './MenuAgente/SidebarDataAgente'
import { PerfilUsuario } from "./MenuAdmin/PerfilUsuario";
import { Link, useLocation } from 'react-router-dom';
import { PerfilAgente } from './MenuAgente/PerfilAgente';
import { roles } from '../../utils/constants';

export function Sidebar({ type }) {
    const location = useLocation()

    return <div className='Sidebar'>
      <ul className='SidebarList'>   
        {(type === roles.ADMIN? SidebarData : SidebarDataAgente)
            .map((val, key) => {
                return (
                <Link to={val.link}>
                <li 
                    key={key} 
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
    </div>
}