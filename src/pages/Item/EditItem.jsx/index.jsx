/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Menu";
import ItemForm from "../../../components/Forms/Item/ItemForm";
import { Grid } from "@mui/material";
import { useMutation } from "react-query";
import { getItem, updatedItem } from "../../../services/item.service";
import { useEffect } from "react";
import { swalClose, swalLoading, swalSuccess } from "../../../utils/swal";
import { userSchema } from "../../../schemas/item.schema";

export function EditItem() {
  const { id } = useParams();
  const handleGetItem = useMutation(async (id) => {
    return await getItem(id);
  });

  const handleUpdatedItem = useMutation(async (data) => {
    swalLoading();
    const updateItemData = await updatedItem(id, data);
    swalSuccess('Medicina actualizada');
    return updateItemData;
  });

  const data = handleGetItem?.data?.data;

  useEffect(() => {
    if (id) handleGetItem.mutate(id);
  }, [id]);

  useEffect(() => {
    if (handleGetItem.isLoading) {
      swalLoading();
    } else {
      swalClose();
    }
  }, [handleGetItem.isLoading]);

  const onSubmit = (data) => {
    handleUpdatedItem.mutate({
      code: data.code,
      name: data.name,
      description: data.description,
      photo: data.photo,
    });
  };

  return (
    <div className="itemBody">
      <Sidebar type="ADMIN" />
      <Grid className="section" container>
        <Grid item xs={12}>
          <h2> Editar Medicina</h2>
          {data && (
            <ItemForm
              schema={userSchema}
              disabledFields={{
                code: true,
              }}
              defaultValues={data}
              onSubmitItem={onSubmit}
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
