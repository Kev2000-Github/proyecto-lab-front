import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { swalClose, swalLoading, swalQuestion, swalSuccess } from '../../utils/swal';
import { deleteGroup, getGroups } from '../../services/group.service';
import { config } from '../../config';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Nombre' },
];

export function GroupPage() {
  const history = useHistory()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [groups, setGroups] = useState({})
  const groupsQuery = useQuery('groups-query', getGroups, config.defaultReactQuery)
  const handleDeleteGroup = useMutation(
    async (id) => {
      swalLoading()
      await deleteGroup(id)
      swalSuccess()
      groupsQuery.refetch()
    }
  )

  useEffect(() => {
    groupsQuery.refetch()
  },[])

  useEffect(() => {
    if(groupsQuery.isSuccess) setGroups(groupsQuery?.data)
  }, [groupsQuery.data])

  useEffect(() => {
    if (groupsQuery.isLoading) swalLoading()
    else swalClose()
  }, [groupsQuery.isLoading]);

  const handlePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(0)
  }
  
  const actions = [
    {
      label: 'Editar',
      onClick: (row) => history.push(`/groups/edit/${row.id}`),
    },
    {
      label: 'Borrar',
      color: 'error',
      onClick: async (row) => {
        const {isConfirmed} = await swalQuestion('¿Estás seguro?', 'No podrás revertir esto')
        if(isConfirmed) handleDeleteGroup.mutate(row.id)
      },
    },
  ];

  const handleCreateGroup = () => {
    history.push("/groups/create")
  }

  return (
    <div className='main'>
      <div className='card'>
        <TableComponent 
          data={groups?.data ?? []} 
          columns={columns} 
          actions={actions}
          page={page}
          rowsPerPage={rowsPerPage}
          totalCount={groups?.count ?? 0}
          handlePage={handlePage}
          handleRowsPerPage={handleRowsPerPage} />
        <Button
          sx={{marginTop: 2}}
          className="card-create-btn"
          variant={"contained"} 
          onClick={handleCreateGroup}> 
            Crear
        </Button>
      </div>
    </div>
  );
}
