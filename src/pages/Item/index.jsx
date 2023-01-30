import TableComponent from "../../components/Table";
import { useMutation, useQuery } from "react-query";
import { deleteItem, getItems, updateQuantity } from "../../services/item.service";
import { useEffect } from "react";
import { config } from '../../config'
import {
  swalClose,
  swalInput,
  swalLoading,
  swalQuestion,
  swalSuccess,
} from "../../utils/swal";
import medicineIcon from '../../resources/medicine-icon.png'
import "./index.scss";
import { useHistory } from "react-router-dom";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { getAllGroups } from "../../services/group.service";
import { getRol, getUser } from "../../utils/helper";
import { roles } from "../../utils/constants";

const onBrokenImage = (e) => {
  e.target.src = medicineIcon
}

const commonColumns = [
  { id: "code", label: "Código" },
  { id: "name", label: "Nombre" },
  { id: "description", label: "Descripción" },
  { id: "photo", label: "Foto", format: (value) => {
    return (
      <div className="item-icon">
        <img 
          onError={onBrokenImage}
          className="item-img" 
          alt="medicine-icon" 
          src={value} />
      </div>
    )
  }},
]

export function ItemPage() {
  const [items, setItems] = useState({})
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [groups, setGroups] = useState([])
  const [selectedGroupId, setSelectedGroupId] = useState("")
  const [byNewItem, setByNewItem] = useState(false)
  const history = useHistory();
  const itemsQuery = useQuery([
    "items-query", 
    page, 
    rowsPerPage, 
    selectedGroupId,
    byNewItem], 
    getItems, 
    config.defaultReactQuery
  )
  const handleDeleteItem = useMutation(async (id) => {
    swalLoading()
    await deleteItem(id)
    swalSuccess()
    itemsQuery.refetch()
  }, config.defaultReactQuery
  )
  const handleUpdateQuantity = useMutation(async ({id, quantity}) => {
    swalLoading()
    await updateQuantity(id, {quantity: Number(quantity)})
    swalClose()
    itemsQuery.refetch()
  }, config.defaultReactQuery
  )
  const columns = getUser()?.subsidiary ? [
    ...commonColumns,
    { id: "quantity", label: "Cantidad" }
  ] : commonColumns

  useEffect(() => {
    getAllGroups()
      .then(resp => {
        setGroups(resp.data)
      })
      .catch(err => {
        console.log(err)
      })
  },[])

  useEffect(() => {
    if(itemsQuery.isLoading) swalLoading()
    else swalClose()
  }, [itemsQuery.isLoading])

  useEffect(() => {
    itemsQuery.refetch()
  },[page, rowsPerPage, selectedGroupId, byNewItem])

  useEffect(() => {
    if(itemsQuery.isSuccess) setItems(itemsQuery?.data)
  },[itemsQuery.data])

  const handlePage = (_, newPage) => {
    setPage(newPage)
  }

  const handleRowsPerPage = (e) => {
    setRowsPerPage(Number(e.target.value))
    setPage(0)
  }

  const handleCreateItem = () => {
    history.push("/drugs/create");
  };

  const actions = getUser()?.subsidiary ?
  [
    {
      label: "Cantidad",
      color: "primary",
      onClick: async (row) => {
        const {isConfirmed, value} = await swalInput()
        if(isConfirmed){
          const quantity = value?.quantity
          handleUpdateQuantity.mutate({id: row.id, quantity})
        }
      },
    }
  ]
  :
  [
    {
      label: "Editar",
      color: "primary",
      onClick: (row) => history.push(`/drugs/edit/${row.id}`),
    },
    {
      label: "Borrar",
      color: "error",
      onClick: async (row) => {
        const {isConfirmed} = await swalQuestion('¿Estás seguro?', 'No podrás revertir esto')
        if(isConfirmed) handleDeleteItem.mutate(row.id)
      },
    },
  ]

  return (
    <div className="main">
        <div className="card">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-grupo-label">Grupo</InputLabel>
            <Select
              labelId="select-grupo-label"
              id="select-grupo"
              value={selectedGroupId}
              onChange={(e) => setSelectedGroupId(e.target.value)}
              label="Group"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {
                groups.map(group => (
                  <MenuItem
                   key={group.id}
                   value={group.id} >
                    {group.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
          {
            getUser()?.subsidiary ?
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="select-bysubsidiary-label">Ver</InputLabel>
            <Select
              labelId="select-bysubsidiary-label"
              id="select-bysubsidiary"
              value={byNewItem}
              onChange={(e) => setByNewItem(e.target.value)}
              label="Group"
            >
              <MenuItem value={false}> por sucursal </MenuItem>
              <MenuItem value={true}> nuevo </MenuItem>
            </Select>
          </FormControl>
          :""
          }
          <TableComponent 
            data={items?.data ?? []} 
            columns={columns} 
            actions={actions}
            page={page}
            rowsPerPage={rowsPerPage}
            totalCount={items?.count ?? 0}
            handlePage={handlePage}
            handleRowsPerPage={handleRowsPerPage} 
          />
          {
            getRol() === roles.ADMIN ?
            <Button
              sx={{marginTop: 2}}
              className="card-create-btn"
              variant={"contained"} 
              onClick={handleCreateItem}> 
                Crear
            </Button>
            :""
          }
        </div>
      </div>
  );
}
