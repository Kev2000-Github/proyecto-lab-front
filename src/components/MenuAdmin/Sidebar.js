import React from 'react';
import "./index.scss";
import { SidebarData } from './SidebarData';
import PerfilUsuario from "./PerfilUsuario";

function Sidebar() {
    return <div className='Sidebar'>
      <ul className='SidebarList'>     
        {SidebarData.map((val, key) => {
            return (
            <li 
            key={key} 
            className="row"
            id= {window.location.pathname == val.link ? "active": ""}
            onClick= {() => {
              window.location.pathname = val.link;
            }}>   
            <div id='icon'>{val.icon}</div> <div id='title'>{val.title}</div>
            
            </li>
          );
          
        })}
        
      </ul>
      <PerfilUsuario/>
    </div>
}
export default Sidebar;