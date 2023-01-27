import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { swalClose, swalError, swalLoading, swalQuestion } from '../../utils/swal';
import { getRol } from '../../utils/helper';
import { getSubsidiaries, deleteSubsidiary } from '../../services/subsidiary.service';

const columns = [
  { id: 'name', label: 'Nombre' },
];

export function SubsidiaryPage() {
  const subsidiariesQuery = useQuery('subsidiaries-query', getSubsidiaries, {
    retry: 0,
    onError: (err) => {
        swalError("Ha ocurrido un error", err.response?.data?.error?.message);
    }
  })

  const handleDeleteSubsidiary = useMutation(
    async (id) => {
      const response =  await deleteSubsidiary(id)
      if (response) subsidiariesQuery.refetch();
    }
  )

  useEffect(() => {
    if (subsidiariesQuery.isLoading) swalLoading()
    else swalClose()
  }, [subsidiariesQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteSubsidiary.isLoading) swalLoading()
    else swalClose()
  }, [handleDeleteSubsidiary.isLoading]);

  const data = subsidiariesQuery?.data?.data ?? [];
  
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
