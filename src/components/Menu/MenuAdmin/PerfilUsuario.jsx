import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function PerfilUsuario() {
  return (
    <div className='navb'>
      <div className='userInfo'>
        <div className='icono'>
          <AccountCircleIcon />
        </div>     
        <h1 className='nombre'>Administrador</h1>
      </div>
    </div>
  );
}
