import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { swalClose, swalError, swalLoading, swalQuestion } from '../../utils/swal';
import { getRol } from '../../utils/helper';
import { deleteGroup, getGroups } from '../../services/group.service';

const columns = [
  { id: 'name', label: 'Nombre' },
];

export function GroupPage() {
  
  const groupsQuery = useQuery('groups-query', getGroups, {
    retry: 0,
    onError: (err) => {
        swalError("Ha ocurrido un error", err.response?.data?.error?.message);
    }
  })

  const handleDeleteGroup = useMutation(
    async (id) => {
      const response =  await deleteGroup(id)
      if (response) groupsQuery.refetch();
    }
  )

  useEffect(() => {
    if (groupsQuery.isLoading) swalLoading()
    else swalClose()
  }, [groupsQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteGroup.isLoading) swalLoading()
    else swalClose()
  }, [handleDeleteGroup.isLoading]);

  const data = groupsQuery?.data?.data ?? [];
  
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
        if(isConfirmed) handleDeleteGroup.mutate(row.id)
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
