import { Sidebar } from '../../components/Menu';
import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { deleteItem, getItems } from '../../services/item.service';
import { useEffect } from 'react';
import { swalClose, swalError, swalLoading, swalQuestion, swalSuccess } from '../../utils/swal';

export function ItemPage() {
  
  const itemsQuery = useQuery(
    'items-query',
    async () => await getItems(),
    {
      enabled: true,
      retry: 0
    }
  )

  const handleDeleteItem = useMutation(
    async (id) => {
      const response =  await deleteItem(id)
      if (response) {
        swalSuccess();
        itemsQuery.refetch();
      }
    }
  )



  useEffect(() => {
   
    if (itemsQuery.isLoading) {
      swalLoading()
    }
    if (itemsQuery.isSuccess) {
      swalClose()
    }

  }, [itemsQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteItem.isLoading) {
      swalLoading()
    }
  }, [handleDeleteItem.isLoading]);

  const data = itemsQuery?.data?.data ?? [];
  
  const columns = [
    { id: 'code', label: 'Código' },
    { id: 'name', label: 'Nombre' },
    { id: 'description', label: 'Descripción' },
    { id: 'photo', label: 'Foto' },
  ];



  const actions = [
    {
      label: 'Editar',
      onClick: (row) => {
      },
    },
    {
      label: 'Borrar',
      onClick: (row) => {
        swalQuestion('¿Estás seguro?', 'No podrás revertir esto', 'warning', 'Sí, borrar').then((result) => {
          if (result.isConfirmed) {
            handleDeleteItem.mutate(row.id)
          }
        })
    
      },
    },
  ];
  
  
  return (
    <>
      {/* <Sidebar type="ADMIN"/> */}
      <TableComponent data={data} columns={columns} actions={actions} />
    </>
  );
}
