import React, { useContext } from 'react';
import {
  Stack,
  Grid,
  FormLabel,
  Radio,
  FormControlLabel,
  RadioGroup,
  Typography,
  Button,
} from '@mui/material';
import { Select } from '@components';
import { COLOR_CODE, MuiTextField } from '@components';
import { useFormik } from 'formik';
import { AddStaffFormFieldsType, AddStaffFormFields } from './type';
import { useAddStaff } from '@queries/Staff/useAddStaff';
import { Toastify, getErrorMessage } from '@shared';
import {
  initialAddStaffFormValues,
  addStaffFormValidationSchema,
  roleOptions,
  StaffToastMessage,
} from './helpers';
import { DialogContext } from '@components';
import { useGetAllStaff } from '@queries';

const NewStaffForm = () => {
  const { closeModal } = useContext(DialogContext);

  const { handleInvalidateAllStaffs } = useGetAllStaff();

  const { addStaff, isLoading } = useAddStaff({
    onSuccess: () => {
      handleInvalidateAllStaffs();
      Toastify.success(StaffToastMessage.ADD_SUCCESS);
      closeModal();
    },
    onError: (error) => Toastify.error(error?.message),
  });

  const handleAddStaff = (formValues: AddStaffFormFieldsType) => {
    const { firstName, lastName, gender, phoneNumber, email, address } = formValues;
    addStaff({
      firstName,
      lastName,
      username: email,
      password: '123456',
      gender: +gender,
      phone: phoneNumber,
      email,
      address,
    });
  };

  const { values, errors, touched, getFieldProps, handleSubmit } =
    useFormik<AddStaffFormFieldsType>({
      initialValues: initialAddStaffFormValues,
      validationSchema: addStaffFormValidationSchema,
      onSubmit: () => {
        handleAddStaff(values);
      },
    });

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  return (
    <form onSubmit={handleSubmit}>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="First name"
            placeholder="First name"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.FIRST_NAME)}
            {...getFieldProps(AddStaffFormFields.FIRST_NAME)}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Last name"
            placeholder="Last name"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.LAST_NAME)}
            {...getFieldProps(AddStaffFormFields.LAST_NAME)}
          />
        </Grid>
        <Grid item xs={6}>
          <Stack spacing="10px">
            <FormLabel id="label-role" className="form__label">
              Role <span className="text-red-500 font-bold text-md">*</span>
            </FormLabel>
            <Select
              onChange={() => {}}
              value={values[AddStaffFormFields.ROLE]}
              placeholder="Choose a role"
              options={roleOptions}
              className={'cmp-select--size-small'}
              // errorMessage={getFieldErrorMessage(AddStaffFormFields.ROLE)}
            />
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing="10px">
            <FormLabel id="label-gender" className="form__label">
              Gender <span className="text-red-500 font-bold text-md">*</span>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="label-gender"
              name="gender"
              {...getFieldProps(AddStaffFormFields.GENDER)}
            >
              <FormControlLabel
                value={1}
                control={<Radio size="small" disableRipple />}
                label="Male"
              />
              <FormControlLabel
                value={0}
                control={<Radio size="small" disableRipple />}
                label="Female"
              />
            </RadioGroup>
            {getFieldErrorMessage(AddStaffFormFields.GENDER) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.GENDER)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Phone number"
            placeholder="Phone number"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.PHONE_NUMBER)}
            {...getFieldProps(AddStaffFormFields.PHONE_NUMBER)}
          />
        </Grid>
        <Grid item xs={6}>
          <MuiTextField
            required
            fullWidth
            size="small"
            label="Email"
            placeholder="Email"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.EMAIL)}
            {...getFieldProps(AddStaffFormFields.EMAIL)}
          />
        </Grid>
        <Grid item xs={12}>
          <MuiTextField
            required
            fullWidth
            multiline
            size="small"
            label="Address"
            placeholder="Address"
            errorMessage={getFieldErrorMessage(AddStaffFormFields.ADDRESS)}
            {...getFieldProps(AddStaffFormFields.ADDRESS)}
          />
        </Grid>
        <Grid item xs={12}>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Button variant="outlined" color="inherit" disabled={isLoading} onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" disabled={isLoading} type="submit">
              Add
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewStaffForm;
