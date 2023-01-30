/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import { swalClose, swalLoading, swalSuccess } from "../../../utils/swal";
import { useState } from "react";
import { config } from "../../../config";
import { getUser, updateUser } from "../../../services/user.service";
import UserForm from "../../../components/Forms/User/UserForm";
import { userSchema } from "../../../schemas/user.schema";

export function EditUser() {
  const [data, setData] = useState()
  const history = useHistory()
  const { id } = useParams();
  const handleGetUser = useQuery(["user-query", id], getUser, config.defaultReactQuery);
  useEffect(() => {
    handleGetUser.refetch()
  },[])
  useEffect(() => {
    if(handleGetUser.isSuccess){
      console.log(handleGetUser?.data?.data)
      const user = handleGetUser?.data?.data
      if(user?.Subsidiary?.id) user.subsidiaryId = user.Subsidiary.id
      setData(user)
    }
  }, [handleGetUser.data])

  useEffect(() => {
    if (handleGetUser.isLoading) swalLoading()
    else swalClose();
  }, [handleGetUser.isLoading]);

  const handleUpdateUser = useMutation(async (data) => {
    swalLoading();
    await updateUser(id, data);
    swalSuccess("Sucursal actualizada", null, () => history.push('/users'));
  }, config.defaultReactQuery);

  const onSubmit = (data) => {
    handleUpdateUser.mutate({
      username: data.username,
      password: data.password,
      subsidiaryId: data.subsidiaryId
    });
  };

  return (
    <div className="main">
        <div className="card">
          <h2> Editar Usuario</h2>
          {data && (
            <UserForm
              schema={userSchema}
              disabledFields={{
                code: true,
              }}
              defaultValues={data}
              onSubmitItem={onSubmit}
            />
          )}
        </div>
      </div>
  );
}
