import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { swalClose, swalError, swalLoading, swalQuestion } from '../../utils/swal';
import { getRol } from '../../utils/helper';
import { getSubsidiaries, deleteSubsidiary } from '../../services/subsidiary.service';
import { config } from '../../config';
import { useState } from 'react';

const columns = [
  { id: 'name', label: 'Nombre' },
];

export function SubsidiaryPage() {
  const [data, setData] = useState([])
  const subsidiariesQuery = useQuery('subsidiaries-query', getSubsidiaries, config.defaultReactQuery)

  const handleDeleteSubsidiary = useMutation(
    async (id) => {
      const response =  await deleteSubsidiary(id)
      if (response) subsidiariesQuery.refetch();
    }
  )

  useEffect(() => {
    subsidiariesQuery.refetch()
  },[])

  useEffect(() => {
    if(subsidiariesQuery.isSuccess) setData(subsidiariesQuery?.data?.data)
  },[subsidiariesQuery.isSuccess])

  useEffect(() => {
    if (subsidiariesQuery.isLoading) swalLoading()
    else swalClose()
  }, [subsidiariesQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteSubsidiary.isLoading) swalLoading()
    else swalClose()
  }, [handleDeleteSubsidiary.isLoading]);
  
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
        if(isConfirmed) handleDeleteSubsidiary.mutate(row.id)
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
