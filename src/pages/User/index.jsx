import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { swalClose, swalError, swalLoading, swalQuestion } from '../../utils/swal';
import './index.scss'
import { getRol } from '../../utils/helper';
import { deleteUser, getUsers } from '../../services/user.service';

const columns = [
  { id: 'username', label: 'Nombre de Usuario' },
  { id: 'role', label: 'Rol' },
  { id: 'Subsidiary', label: 'Sucursal'}
];

export function UserPage() {
  
  const usersQuery = useQuery('users-query', getUsers, {
    retry: 0,
    onSuccess: (resp) => {
      swalClose()
      resp.data = resp.data.map(user => {
        const userParsed = user
        userParsed.Subsidiary = user.Subsidiary?.name
        return userParsed
      })
    },
    onError: (err) => {
        swalError("Ha ocurrido un error", err.response?.data?.error?.message);
    }
  })

  const handleDeleteUser = useMutation(
    async (id) => {
      const response =  await deleteUser(id)
      if (response) usersQuery.refetch();
    }
  )

  useEffect(() => {
    if (usersQuery.isLoading) swalLoading()
    else swalClose()
  }, [usersQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteUser.isLoading) swalLoading()
    else swalClose()
  }, [handleDeleteUser.isLoading]);

  const data = usersQuery?.data?.data ?? [];
  
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
