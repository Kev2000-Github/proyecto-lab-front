/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import ItemForm from "../../../components/Forms/Item/ItemForm";
import { useMutation } from "react-query";
import { createItem } from "../../../services/item.service";
import { swalLoading, swalSuccess } from "../../../utils/swal";
import { itemSchema } from "../../../schemas/item.schema";
import { config } from "../../../config";

export function CreateItem() {
  const history = useHistory();

  const handleCreateItem = useMutation(async (data) => {
    swalLoading();
    await createItem(data);
    swalSuccess("Medicina creada con exito", null, () => history.push('/drugs'));
  }, config.defaultReactQuery);

  const onSubmit = (data) => {
    const groups = data.groups.map(group => group.id)
    handleCreateItem.mutate({
      code: data.code,
      name: data.name,
      description: data.description,
      photo: data.photo,
      groups
    });
  };

  return (
    <div className="main">
        <div className="card">
          <h2> Crear Medicina</h2>
          <ItemForm schema={itemSchema} onSubmitItem={onSubmit} />
        </div>
      </div>
  );
}
