import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Box, Button, Grid, InputLabel, MenuItem, Select, TextField, FormControl, FormHelperText, Autocomplete } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { getAllSubsidiaries } from "../../../services/subsidiary.service";
import { getAllGroups } from "../../../services/group.service";

const UserForm = ({
  onSubmitItem,
  submitText,
  defaultValues,
  schema,
  disabledFields,
  nullableSelect = false
}) => {
  const [subsidiaries, setSubsidiaries] = useState([])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    onSubmitItem(data);
  };
  
  useEffect(() => {
    init()
  }, [])

  const init = async () => {
    try{
      const subsidiaries = await getAllSubsidiaries()
      setSubsidiaries(subsidiaries?.data)
    }
    catch(err){
      console.error(err)
    }
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2} sx={{maxWidth: 500}}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            name="username"
            label="Usuario"
            disabled={disabledFields.username}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            name="password"
            label="Contraseña"
            disabled={disabledFields.password}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel id="select-sucursal-label">Sucursal</InputLabel>
            <Select
              {...register("subsidiaryId")}
              error={!!errors.subsidiaryId}
              name="subsidiaryId"
              defaultValue={defaultValues.subsidiaryId}
              disabled={disabledFields.password}
              labelId="select-sucursal-label"
              label="Subsidiary"
              variant="standard"
              sx={{minWidth: 100}}
            >
              {
                nullableSelect ? 
                <MenuItem value={"none"}><em>Ninguno</em></MenuItem>
                :
                ""
              }
              {
                subsidiaries.map(subsidiary => (
                  <MenuItem
                  key={subsidiary.id}
                  value={subsidiary.id} >
                    {subsidiary.name}
                  </MenuItem>
                ))
              }
            </Select>
            {
              !!errors.subsidiaryId ? 
              <FormHelperText error>
              {errors.subsidiaryId?.message}
            </FormHelperText>
            :""
            }
          </FormControl>
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

UserForm.prototype = {
  onSubmitItem: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  schema: PropTypes.object.isRequired,
  disabled: PropTypes.object,
  submitText: PropTypes.string.isRequired,
  disabledFields: PropTypes.object,
};

UserForm.defaultProps = {
  schema: {},
  disabledFields: {
    username: false,
    password: false,
    subsidiaryId: false,
  },
  defaultValues: {
    username: "",
    password: "",
    subsidiaryId: "",
  },
  submitText: "Guardar",
};

export default UserForm;
