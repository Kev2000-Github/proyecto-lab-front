import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { swalClose, swalLoading, swalQuestion } from '../../utils/swal';
import './index.scss'
import { getRol } from '../../utils/helper';
import { deleteUser, getUsers } from '../../services/user.service';
import { config } from '../../config';

const columns = [
  { id: 'username', label: 'Nombre de Usuario' },
  { id: 'role', label: 'Rol' },
  { id: 'Subsidiary', label: 'Sucursal'}
];

export function UserPage() {
  const [data, setData] = useState([])
  const usersQuery = useQuery('users-query', getUsers, {
    ...config.defaultReactQuery,
    onSuccess: (resp) => {
      resp.data = resp.data.map(user => {
        const userParsed = user
        userParsed.Subsidiary = user.Subsidiary?.name
        return userParsed
      })
    }
  })

  const handleDeleteUser = useMutation(deleteUser, {
    onError: config.defaultOnErrorQuery,
    onSuccess: () => usersQuery.refetch()
  })

  useEffect(()=>{
    usersQuery.refetch()
  },[])

  useEffect(() =>{
    if(usersQuery.isSuccess) setData(usersQuery?.data?.data)
  },[usersQuery.isSuccess])

  useEffect(() => {
    if (usersQuery.isLoading) swalLoading()
    else swalClose()
  }, [usersQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteUser.isLoading) swalLoading()
  }, [handleDeleteUser.isLoading]);
  
  const actions = [
    {
      label: 'Editar',
      onClick: (row) => {
      },
    },
    {
      label: 'Borrar',
      onClick: async (row) => {
        const {isConfirmed} = await swalQuestion('¿Estás seguro?', 'No podrás revertir esto')
        if(isConfirmed) handleDeleteUser.mutate(row.id)
      },
    },
  ];
  
  
  return (
    <div className='itemBody'>
      <Sidebar type={getRol()}/>
      <div className='main'>
        <div className='card'>
          <TableComponent 
            data={data} 
            columns={columns} 
            actions={actions} />
        </div>
      </div>
    </div>
  );
}
