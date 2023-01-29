import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { Box, Button, Grid, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";

const GroupForm = ({
  onSubmitItem,
  submitText,
  defaultValues,
  schema,
  disabledFields,
}) => {
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
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            name="name"
            label="Nombre"
            disabled={disabledFields.name}
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

GroupForm.prototype = {
  onSubmitItem: PropTypes.func.isRequired,
  defaultValues: PropTypes.object,
  schema: PropTypes.object.isRequired,
  disabled: PropTypes.object,
  submitText: PropTypes.string.isRequired,
  disabledFields: PropTypes.object,
};

GroupForm.defaultProps = {
  schema: {},
  disabledFields: {
    name: false
  },
  defaultValues: {
    name: ""
  },
  submitText: "Guardar",
};

export default GroupForm;
