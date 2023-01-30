import TableComponent from '../../components/Table';
import { useMutation, useQuery } from 'react-query';
import { useEffect } from 'react';
import { swalClose, swalLoading, swalQuestion, swalSuccess } from '../../utils/swal';
import { getSubsidiaries, deleteSubsidiary } from '../../services/subsidiary.service';
import { config } from '../../config';
import { useState } from 'react';
import {Button} from '@mui/material'
import { useHistory } from 'react-router-dom';

const columns = [
  { id: 'name', label: 'Nombre' },
];

export function SubsidiaryPage() {
  const history = useHistory()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [subsidiaries, setSubsidiaries] = useState({})
  const subsidiariesQuery = useQuery('subsidiaries-query', getSubsidiaries, config.defaultReactQuery)

  const handleDeleteSubsidiary = useMutation(
    async (id) => {
      swalLoading()
      await deleteSubsidiary(id)
      swalSuccess()
      subsidiariesQuery.refetch()
    }
  )

  useEffect(() => {
    subsidiariesQuery.refetch()
  },[])

  useEffect(() => {
    if(subsidiariesQuery.isSuccess) setSubsidiaries(subsidiariesQuery?.data)
  },[subsidiariesQuery.data])

  useEffect(() => {
    if (subsidiariesQuery.isLoading) swalLoading()
    else swalClose()
  }, [subsidiariesQuery.isLoading]);
  
  const actions = [
    {
      label: 'Editar',
      onClick: (row) => history.push(`/subsidiaries/edit/${row.id}`),
    },
    {
      label: 'Borrar',
      color: "error",
      onClick: async (row) => {
        const {isConfirmed} = await swalQuestion('¿Estás seguro?', 'No podrás revertir esto')
        if(isConfirmed) handleDeleteSubsidiary.mutate(row.id)
      },
    },
  ];
  
  const handleCreateSubsidiary = () => {
    history.push("/subsidiaries/create");
  }

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
            data={subsidiaries?.data ?? []} 
            columns={columns} 
            actions={actions}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={subsidiaries?.count ?? 0}
            handlePage={handlePage}
            handleRowsPerPage={handleRowsPerPage} />
          <Button
            sx={{marginTop: 2}}
            className="card-create-btn"
            variant={"contained"} 
            onClick={handleCreateSubsidiary}> 
              Crear
          </Button>
        </div>
      </div>
  );
}
