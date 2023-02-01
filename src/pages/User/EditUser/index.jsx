/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import { swalClose, swalLoading, swalSuccess } from "../../../utils/swal";
import { useState } from "react";
import { config } from "../../../config";
import { getUser, updateUser } from "../../../services/user.service";
import UserForm from "../../../components/Forms/User/UserForm";
import { editUserSchema, userSchema } from "../../../schemas/user.schema";
import { getRol } from "../../../utils/helper";
import { roles } from "../../../utils/constants";

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
      const user = handleGetUser?.data?.data
      user.subsidiaryId = user?.Subsidiary?.id ?? 'none'

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
    const subsidiaryId = data.subsidiaryId === "none" ? "" : data.subsidiaryId
    const password = data.password ?? null
    const dataPassed = {
      username: data.username,
      subsidiaryId
    }
    if(password) dataPassed.password = password
    handleUpdateUser.mutate(dataPassed);
  };

  return (
    <div className="main">
        <div className="card">
          <h2> Editar Usuario</h2>
          {data && (
            <UserForm
              nullableSelect={getRol() === roles.ADMIN}
              schema={editUserSchema}
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
