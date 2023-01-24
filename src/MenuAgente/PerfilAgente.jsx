import "./agente.scss";
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';

function PerfilAgente() {
  return (
    <div className='navbb'>
      <div className='icono'>
        <AccountCircleIcon />
      </div>     
    
    <div>
      <h1 className='nombre'>Agente</h1>
    </div>

    <div className='icono2'>
        <HomeWorkIcon />
      </div>     
    
    <div>
      <h1 className='nombre2'>Sucursal</h1>
    </div>
    </div>
  );
}
export default PerfilAgente;