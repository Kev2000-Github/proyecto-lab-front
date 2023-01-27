import { Sidebar } from "../../components/Menu";
import TableComponent from "../../components/Table";
import { useMutation, useQuery } from "react-query";
import { deleteItem, getItems } from "../../services/item.service";
import { useEffect } from "react";
import {
  swalClose,
  swalLoading,
  swalQuestion,
  swalSuccess,
} from "../../utils/swal";
import "./index.scss";
import { getRol } from "../../utils/helper";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

export function ItemPage() {
  const history = useHistory();
  const itemsQuery = useQuery("items-query", async () => await getItems(), {
    enabled: true,
    retry: 0,
  });

  const handleDeleteItem = useMutation(async (id) => {
    const response = await deleteItem(id);
    if (response) {
      swalSuccess();
      itemsQuery.refetch();
    }
  });

  useEffect(() => {
    if (itemsQuery.isLoading) {
      swalLoading();
    }
    if (itemsQuery.isSuccess) {
      swalClose();
    }
  }, [itemsQuery.isLoading, itemsQuery.isSuccess]);

  useEffect(() => {
    if (handleDeleteItem.isLoading) {
      swalLoading();
    }
  }, [handleDeleteItem.isLoading]);

  const data = itemsQuery?.data?.data ?? [];

  const columns = [
    { id: "code", label: "Código" },
    { id: "name", label: "Nombre" },
    { id: "description", label: "Descripción" },
    {
      id: "photo",
      label: "Foto",
      format: (value) => {
        return <img src={value} />;
      },
    },
  ];

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
      onClick: (row) => {
        swalQuestion(
          "¿Estás seguro?",
          "No podrás revertir esto",
          "warning",
          "Sí, borrar"
        ).then((result) => {
          if (result.isConfirmed) {
            handleDeleteItem.mutate(row.id);
          }
        });
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
