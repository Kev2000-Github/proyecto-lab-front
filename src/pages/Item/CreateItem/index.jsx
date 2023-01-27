/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { Sidebar } from "../../../components/Menu";
import ItemForm from "../../../components/Forms/Item/ItemForm";
import { Grid } from "@mui/material";
import { useMutation } from "react-query";
import { createItem } from "../../../services/item.service";
import { swalLoading, swalSuccess } from "../../../utils/swal";
import { userSchema } from "../../../schemas/item.schema";

export function CreateItem() {
  const history = useHistory();

  const handleCreateItem = useMutation(async (data) => {
    swalLoading();
    await createItem(data);
    swalSuccess("Medicina creada con exito");
    history.push("/drugs");
  });

  const onSubmit = (data) => {
    handleCreateItem.mutate({
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
          <h2> Crear Medicina</h2>
          <ItemForm schema={userSchema} onSubmitItem={onSubmit} />
        </Grid>
      </Grid>
    </div>
  );
}
