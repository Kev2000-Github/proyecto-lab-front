/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Menu";
import ItemForm from "../../../components/Forms/Item/ItemForm";
import { useMutation, useQuery } from "react-query";
import { updatedItem } from "../../../services/item.service";
import { useEffect } from "react";
import { swalClose, swalLoading, swalSuccess } from "../../../utils/swal";
import { getRol } from "../../../utils/helper";
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
    if(handleGetSubsidiary.isSuccess) setData(handleGetSubsidiary?.data?.data)
  }, [handleGetSubsidiary.data])

  useEffect(() => {
    if (handleGetSubsidiary.isLoading) swalLoading()
    else swalClose();
  }, [handleGetSubsidiary.isLoading]);

  const handleUpdatedSubsidiary = useMutation(async (data) => {
    swalLoading();
    await updateSubsidiary(id, data);
    swalSuccess("Sucursal actualizada", null, () => history.push('/subsidiaries'));
  }, config.defaultReactQuery);

  const onSubmit = (data) => {
    handleUpdatedSubsidiary.mutate({
      name: data.name,
    });
  };

  return (
    <div className="itemBody">
      <Sidebar type={getRol()} />
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
    </div>
  );
}