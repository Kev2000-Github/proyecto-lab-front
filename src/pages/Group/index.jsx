import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect, useState } from 'react';
import { swalClose, swalLoading, swalQuestion } from '../../utils/swal';
import { getRol } from '../../utils/helper';
import { deleteGroup, getGroups } from '../../services/group.service';
import { config } from '../../config';

const columns = [
  { id: 'name', label: 'Nombre' },
];

export function GroupPage() {
  const [data, setData] = useState([])
  const groupsQuery = useQuery('groups-query', getGroups, config.defaultReactQuery)
  const handleDeleteGroup = useMutation(
    async (id) => {
      const response =  await deleteGroup(id)
      if (response) groupsQuery.refetch();
    }
  )

  useEffect(() => {
    groupsQuery.refetch()
  },[])

  useEffect(() => {
    if(groupsQuery.isSuccess) setData(groupsQuery?.data?.data)
  }, [groupsQuery.isSuccess])

  useEffect(() => {
    if (groupsQuery.isLoading) swalLoading()
    else swalClose()
  }, [groupsQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteGroup.isLoading) swalLoading()
    else swalClose()
  }, [handleDeleteGroup.isLoading]);

  
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
