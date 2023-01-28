import { Sidebar } from "../../components/Menu";
import TableComponent from "../../components/Table";
import { useMutation, useQuery } from "react-query";
import { deleteItem, getItems } from "../../services/item.service";
import { useEffect } from "react";
import { config } from '../../config'
import {
  swalClose,
  swalLoading,
  swalQuestion,
  swalSuccess,
  swalError
} from "../../utils/swal";
import "./index.scss";
import { getRol } from "../../utils/helper";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import { useState } from "react";

const columns = [
  { id: "code", label: "Código" },
  { id: "name", label: "Nombre" },
  { id: "description", label: "Descripción" },
  { id: "photo", label: "Foto", format: (value) => <img alt="medicine-icon" src={value} />},
];

export function ItemPage() {
  const [data, setData] = useState([])
  const history = useHistory();
  const itemsQuery = useQuery("items-query", getItems, config.defaultReactQuery);
  const handleDeleteItem = useMutation(async (id) => {
    const response = await deleteItem(id);
    if (response) {
      swalSuccess();
      itemsQuery.refetch();
    }
  });

  useEffect(() => {
    itemsQuery.refetch()
  },[])

  useEffect(() => {
    if(itemsQuery.isSuccess) setData(itemsQuery?.data?.data)
  },[itemsQuery.isSuccess])

  useEffect(() => {
    if (itemsQuery.isLoading) swalLoading();
    else swalClose();
  }, [itemsQuery.isLoading]);

  useEffect(() => {
    if (handleDeleteItem.isLoading) swalLoading();
    else swalClose()
  }, [handleDeleteItem.isLoading]);

  const handleCreateItem = () => {
    history.push("/drugs/create");
  };

  const actions = [
    {
      label: "Editar",
      color: "primary",
      onClick: (row) => {
        history.push(`/drugs/edit/${row.id}`);
      },
    },
    {
      label: "Borrar",
      color: "error",
      onClick: async (row) => {
        const {isConfirmed} = await swalQuestion('¿Estás seguro?', 'No podrás revertir esto')
        if(isConfirmed) handleDeleteItem.mutate(row.id)
      },
    },
  ];
  return (
    <div className="itemBody">
      <Sidebar type={getRol()} />
      <div className="main">
        <div className="card">
          <Button variant={"contained"} onClick={handleCreateItem}> Crear</Button>
          <TableComponent data={data} columns={columns} actions={actions} />
        </div>
      </div>
    </div>
  );
}
