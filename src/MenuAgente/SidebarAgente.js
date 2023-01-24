import React from 'react';
import "./agente.scss";
import { SidebarDataAgente } from './SidebarDataAgente';
import PerfilUsuario from "./PerfilAgente";

function SidebarAgente() {
    return <div className='SidebarAgente'>
      <ul className='SidebarList'>     
        {SidebarDataAgente.map((val, key) => {
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
export default SidebarAgente;