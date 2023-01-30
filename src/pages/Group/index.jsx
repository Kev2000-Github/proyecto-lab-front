import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { swalClose, swalLoading, swalQuestion, swalSuccess } from '../../utils/swal';
import { getRol } from '../../utils/helper';
import { deleteGroup, getGroups } from '../../services/group.service';
import { config } from '../../config';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Nombre' },
];

export function GroupPage() {
  const history = useHistory()
  const [data, setData] = useState([])
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
    if(groupsQuery.isSuccess) setData(groupsQuery?.data?.data)
  }, [groupsQuery.data])

  useEffect(() => {
    if (groupsQuery.isLoading) swalLoading()
    else swalClose()
  }, [groupsQuery.isLoading]);

  
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
          data={data} 
          columns={columns} 
          actions={actions} />
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
