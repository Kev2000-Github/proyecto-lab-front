import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { getUser } from '../../../utils/helper';

export function PerfilAgente() {
  return (
    <div className='navb'>
      <div className='userInfo'>
        <div className='icono'>
          <AccountCircleIcon />
        </div>     
        <h1 className='nombre'>
          {getUser()?.username ?? "Agente"}
        </h1>
      </div>
      <div className='userInfo'>
        <div className='icono'>
          <HomeWorkIcon />
        </div>     
        <h1 className='nombre'>
          {getUser()?.subsidiary ?? "Sucursal"}
        </h1>
      </div>
    </div>
  );
}