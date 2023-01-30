import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { swalClose, swalLoading, swalQuestion, swalSuccess } from '../../utils/swal';
import './index.scss'
import { deleteUser, getUsers } from '../../services/user.service';
import { config } from '../../config';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';

const columns = [
  { id: 'username', label: 'Nombre de Usuario' },
  { id: 'role', label: 'Rol' },
  { id: 'Subsidiary', label: 'Sucursal'}
];

export function UserPage() {
  const history = useHistory()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [users, setUsers] = useState({})
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

  const handleDeleteUser = useMutation(async (id) => {
    swalLoading()
    await deleteUser(id)
    swalSuccess()
    usersQuery.refetch()
  }, config.defaultReactQuery);

  useEffect(()=>{
    usersQuery.refetch()
  },[])

  useEffect(() =>{
    if(usersQuery.isSuccess) setUsers(usersQuery?.data)
  },[usersQuery.data])

  useEffect(() => {
    if (usersQuery.isLoading) swalLoading()
    else swalClose()
  }, [usersQuery.isLoading]);

  const handleCreateUser = () => {
    history.push('/users/create')
  }
  
  const actions = [
    {
      label: 'Editar',
      onClick: (row) => history.push(`/users/edit/${row.id}`),
    },
    {
      label: 'Borrar',
      color: 'error',
      onClick: async (row) => {
        const {isConfirmed} = await swalQuestion('¿Estás seguro?', 'No podrás revertir esto')
        if(isConfirmed) handleDeleteUser.mutate(row.id)
      },
    },
  ];
  
  const handlePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(0)
  }
  
  return (
    <div className='main'>
        <div className='card'>
          <TableComponent 
            data={users?.data ?? []} 
            columns={columns} 
            actions={actions}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={users?.count ?? 0}
            handlePage={handlePage}
            handleRowsPerPage={handleRowsPerPage} />
          <Button
            sx={{marginTop: 2}}
            className="card-create-btn"
            variant={"contained"} 
            onClick={handleCreateUser}> 
              Crear
          </Button>
        </div>
      </div>
  );
}
