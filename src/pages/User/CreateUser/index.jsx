/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from "react-router-dom";
import { Sidebar } from "../../../components/Menu";
import { useMutation } from "react-query";
import { swalLoading, swalSuccess } from "../../../utils/swal";
import { getRol } from "../../../utils/helper";
import { config } from "../../../config";
import { createUser } from "../../../services/user.service";
import UserForm from "../../../components/Forms/User/UserForm";
import { userSchema } from "../../../schemas/user.schema";

export function CreateUser() {
  const history = useHistory();

  const handleCreateUser = useMutation(async (data) => {
    swalLoading();
    await createUser(data);
    swalSuccess("Usuario creado con exito", null, () => history.push('/users'));
  }, config.defaultReactQuery);

  const onSubmit = (data) => {
    handleCreateUser.mutate({
      username: data.username,
      password: data.password,
      subsidiaryId: data.subsidiaryId
    });
  };

  return (
    <div className="main">
        <div className="card">
          <h2> Crear Usuario</h2>
          <UserForm schema={userSchema} onSubmitItem={onSubmit} />
        </div>
      </div>
  );
}
