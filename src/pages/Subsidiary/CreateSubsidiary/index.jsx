/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { Sidebar } from "../../../components/Menu";
import ItemForm from "../../../components/Forms/Item/ItemForm";
import { useMutation } from "react-query";
import { swalLoading, swalSuccess } from "../../../utils/swal";
import { getRol } from "../../../utils/helper";
import { createSubsidiary } from "../../../services/subsidiary.service";
import { subsidiarySchema } from "../../../schemas/subsidiary.schema";
import SubsidiaryForm from "../../../components/Forms/Subsidiary/SubsidiaryForm";

export function CreateSubsidiary() {
  const history = useHistory();

  const handleCreateItem = useMutation(async (data) => {
    swalLoading();
    await createSubsidiary(data);
    swalSuccess("Sucursal creada con exito", null, () => history.push('/subsidiaries'));
  });

  const onSubmit = (data) => {
    handleCreateItem.mutate({
      name: data.name
    });
  };

  return (
    <div className="main">
        <div className="card">
          <h2> Crear Sucursal</h2>
          <SubsidiaryForm schema={subsidiarySchema} onSubmitItem={onSubmit} />
        </div>
      </div>
  );
}
