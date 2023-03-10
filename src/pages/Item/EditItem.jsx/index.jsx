/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory, useParams } from "react-router-dom";
import ItemForm from "../../../components/Forms/Item/ItemForm";
import { useMutation, useQuery } from "react-query";
import { getItem, updatedItem } from "../../../services/item.service";
import { useEffect } from "react";
import { swalClose, swalLoading, swalSuccess } from "../../../utils/swal";
import { editItemSchema } from "../../../schemas/item.schema";
import { useState } from "react";
import { config } from "../../../config";

export function EditItem() {
  const [data, setData] = useState()
  const history = useHistory()
  const { id } = useParams();
  const handleGetItem = useQuery(["item-query", id], getItem, config.defaultReactQuery);

  useEffect(() => {
    handleGetItem.refetch()
  },[])

  useEffect(() => {
    if(handleGetItem.isSuccess) {
      setData(handleGetItem?.data?.data)
    }
  }, [handleGetItem.data])

  useEffect(() => {
    if (handleGetItem.isLoading) swalLoading()
    else swalClose();
  }, [handleGetItem.isLoading]);

  const handleUpdatedItem = useMutation(async (data) => {
    swalLoading();
    await updatedItem(id, data);
    swalSuccess("Medicina actualizada", null, () => history.push('/drugs'));
  }, config.defaultReactQuery);

  const onSubmit = (data) => {
    const groups = data.groups.map(group => group.id)
    handleUpdatedItem.mutate({
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
          <h2> Editar Medicina</h2>
          {data && (
            <ItemForm
              schema={editItemSchema}
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
