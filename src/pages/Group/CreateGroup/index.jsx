/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { swalLoading, swalSuccess } from "../../../utils/swal";
import { createGroup } from "../../../services/group.service";
import { groupSchema } from "../../../schemas/group.schema";
import GroupForm from "../../../components/Forms/Group/GroupForm";
import { config } from "../../../config";

export function CreateGroup() {
  const history = useHistory();

  const handleCreateGroup = useMutation(async (data) => {
    swalLoading();
    await createGroup(data);
    swalSuccess("Grupo creada con exito", null, () => history.push('/groups'));
  }, config.defaultReactQuery);

  const onSubmit = (data) => {
    handleCreateGroup.mutate({
      name: data.name
    });
  };

  return (
    <div className="main">
      <div className="card">
        <h2> Crear Grupo</h2>
        <GroupForm schema={groupSchema} onSubmitItem={onSubmit} />
      </div>
    </div>
  );
}
