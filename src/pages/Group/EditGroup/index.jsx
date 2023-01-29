/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Menu";
import ItemForm from "../../../components/Forms/Item/ItemForm";
import { Grid } from "@mui/material";
import { useMutation, useQuery } from "react-query";
import { getItem, updatedItem } from "../../../services/item.service";
import { useEffect } from "react";
import { swalClose, swalLoading, swalSuccess, swalError } from "../../../utils/swal";
import { userSchema } from "../../../schemas/item.schema";
import { getRol } from "../../../utils/helper";
import { useState } from "react";
import { config } from "../../../config";
import { getGroup, updateGroup } from "../../../services/group.service";
import { groupSchema } from "../../../schemas/group.schema";
import GroupForm from "../../../components/Forms/Group/GroupForm";

export function EditGroup() {
  const [data, setData] = useState()
  const history = useHistory()
  const { id } = useParams();
  const handleGetGroup = useQuery(["group-query", id], getGroup, config.defaultReactQuery);

  useEffect(() => {
    handleGetGroup.refetch()
  },[])

  useEffect(() => {
    if(handleGetGroup.isSuccess) setData(handleGetGroup?.data?.data)
  }, [handleGetGroup.data])

  useEffect(() => {
    if (handleGetGroup.isLoading) swalLoading()
    else swalClose();
  }, [handleGetGroup.isLoading]);

  const handleUpdateGroup = useMutation(async (data) => {
    swalLoading();
    await updateGroup(id, data);
    swalSuccess("Grupo actualizado", null, () => history.push('/groups'));
  });

  const onSubmit = (data) => {
    handleUpdateGroup.mutate({
      name: data.name
    });
  };

  return (
    <div className="itemBody">
      <Sidebar type={getRol()} />
      <div className="main">
        <div className="card">
          <h2> Editar Grupo</h2>
          {data && (
            <GroupForm
              schema={groupSchema}
              disabledFields={{
                code: true,
              }}
              defaultValues={data}
              onSubmitItem={onSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
}
