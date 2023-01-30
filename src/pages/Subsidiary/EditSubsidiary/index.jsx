/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import { swalClose, swalLoading, swalSuccess } from "../../../utils/swal";
import { useState } from "react";
import { config } from "../../../config";
import { getSubsidiary, updateSubsidiary } from "../../../services/subsidiary.service";
import { subsidiarySchema } from "../../../schemas/subsidiary.schema";
import SubsidiaryForm from "../../../components/Forms/Subsidiary/SubsidiaryForm";

export function EditSubsidiary() {
  const [data, setData] = useState()
  const history = useHistory()
  const { id } = useParams();
  const handleGetSubsidiary = useQuery(["subsidiary-query", id], getSubsidiary, config.defaultReactQuery);

  useEffect(() => {
    handleGetSubsidiary.refetch()
  },[])

  useEffect(() => {
    if(handleGetSubsidiary.isSuccess) {
      console.log(data, handleGetSubsidiary?.data?.data)
      setData(handleGetSubsidiary?.data?.data)
    }
  }, [handleGetSubsidiary.data])

  useEffect(() => {
    if (handleGetSubsidiary.isLoading) swalLoading()
    else swalClose();
  }, [handleGetSubsidiary.isLoading]);

  const handleUpdatedSubsidiary = useMutation(async (data) => {
    swalLoading();
    await updateSubsidiary(id, data);
    swalSuccess("Sucursal actualizada", null, () => {
      setData(null)
      history.push('/subsidiaries')
    });
  }, config.defaultReactQuery);

  const onSubmit = (data) => {
    handleUpdatedSubsidiary.mutate({
      name: data.name,
    });
  };

  return (
    <div className="main">
        <div className="card">
          <h2> Editar Sucursal</h2>
          {data && (
            <SubsidiaryForm
              schema={subsidiarySchema}
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
