import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useEffect } from "react";
import { getAllGroups } from "../../../services/group.service";

const ItemForm = ({
  onSubmitItem,
  submitText,
  defaultValues,
  schema,
  disabledFields,
}) => {
  const [groups, setGroups] = useState([])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    init()
  },[])

  const init = async () => {
    try{
      const groups = await getAllGroups()
      setGroups(groups?.data)
    }
    catch(err){
      console.err(err)
    }
  }

  const onSubmit = (data) => {
    onSubmitItem(data);
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <TextField
            fullWidth
            error={!!errors.code}
            helperText={errors.code?.message}
            {...register("code")}
            name="code"
            label="Código"
            disabled={disabledFields.code}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            name="name"
            label="Nombre"
            disabled={disabledFields.name}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            {...register("description")}
            error={!!errors.description}
            helperText={errors.description?.message}
            name="description"
            label="Descripción"
            disabled={disabledFields.description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            error={!!errors.photo}
            helperText={errors.photo?.message}
            {...register("photo")}
            name="photo"
            label="Url de la foto"
            disabled={disabledFields.photo}
          />
        </Grid>
        <Grid item xs={12}>
        <Controller
          name="groups"
          control={control}
          defaultValue={defaultValues.groups}
          render = {({field: {ref, ...field}, fieldState: {error}}) => (
            <Autocomplete
              {...field}
              multiple
              options={groups}
              getOptionLabel={(option) => option.name}
              onChange={(_, value) => field.onChange(value)}
              isOptionEqualToValue={(op, val) => {
                return op.id === val.id
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Grupos"
                  placeholder="Grupos"
                  error={!!errors.groups}
                  helperText={errors.groups?.message} 
                  disabled={disabledFields.groups}
                  name="groups"
                  inputRef={ref}
                />
              )}
            />
          )}
        />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            {submitText}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

ItemForm.prototype = {
  onSubmitItem: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  schema: PropTypes.object.isRequired,
  disabled: PropTypes.object,
  submitText: PropTypes.string.isRequired,
  disabledFields: PropTypes.object,
};

ItemForm.defaultProps = {
  schema: {},
  disabledFields: {
    name: false,
    description: false,
    photo: false,
    code: false,
    groups: false
  },
  defaultValues: {
    name: "",
    description: "",
    photo: "",
    code: "",
    groups: []
  },
  submitText: "Guardar",
};

export default ItemForm;
