import "./index.scss";
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function PerfilUsuario() {
  return (
    <div className='navb'>
      <div className='icono'>
        <AccountCircleIcon />
      </div>     
    
    <div>
      <h1 className='nombre'>Administrador</h1>
    </div>
    </div>
  );
}
export default PerfilUsuario;