import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getUser } from '../../../utils/helper';

export function PerfilUsuario() {
  return (
    <div className='navb'>
      <div className='userInfo'>
        <div className='icono'>
          <AccountCircleIcon />
        </div>     
        <h1 className='nombre'>
          {getUser()?.username ?? "Administrador"}
        </h1>
      </div>
    </div>
  );
}
