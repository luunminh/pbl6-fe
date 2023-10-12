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
import { CustomTextField, COLOR_CODE } from '@components';
import { useFormik } from 'formik';
import { AddStaffFormFieldsType, AddStaffFormFields } from './type';
import { useAddStaff } from '@queries/Staff/useAddStaff';
import { Toastify, getErrorMessage } from '@shared';
import { initialAddStaffFormValues, addStaffFormValidationSchema, roleOptions } from './helpers';
import { DialogContext } from '@components';

const NewStaffForm = () => {
  const { closeModal } = useContext(DialogContext);

  const { addStaff, isLoading, handleInvalidateStaffList } = useAddStaff({
    onSuccess: () => {
      handleInvalidateStaffList();
      Toastify.success('Added successfully!');
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
          <Stack spacing="10px">
            <FormLabel id="label-first-name" className="form__label">
              First name
            </FormLabel>
            <CustomTextField
              required
              placeholder="First name"
              id="firstName"
              name="firstName"
              aria-labelledby="label-first-name"
              size="small"
              error={getFieldErrorMessage(AddStaffFormFields.FIRST_NAME) ? true : false}
              {...getFieldProps(AddStaffFormFields.FIRST_NAME)}
            />
            {getFieldErrorMessage(AddStaffFormFields.FIRST_NAME) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.FIRST_NAME)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing="10px">
            <FormLabel id="label-last-name" className="form__label">
              Last name
            </FormLabel>
            <CustomTextField
              required
              placeholder="Last name"
              id="lastName"
              name="lastName"
              aria-labelledby="label-last-name"
              size="small"
              error={getFieldErrorMessage(AddStaffFormFields.LAST_NAME) ? true : false}
              {...getFieldProps(AddStaffFormFields.LAST_NAME)}
            />
            {getFieldErrorMessage(AddStaffFormFields.LAST_NAME) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.LAST_NAME)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing="10px">
            <FormLabel id="label-role" className="form__label">
              Role
            </FormLabel>
            <Select
              onChange={() => {}}
              value={'1'}
              placeholder="Choose a role"
              options={roleOptions}
              className={'cmp-select--size-small'}
            />
            {/* {getFieldErrorMessage(AddStaffFormFields.ROLE) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.ROLE)}
              </Typography>
            ) : null} */}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing="10px">
            <FormLabel id="label-gender" className="form__label">
              Gender
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
          <Stack spacing="10px">
            <FormLabel id="label-phone-number" className="form__label">
              Phone number
            </FormLabel>
            <CustomTextField
              required
              placeholder="Phone number"
              id="phoneNumber"
              name="phoneNumber"
              size="small"
              error={getFieldErrorMessage(AddStaffFormFields.PHONE_NUMBER) ? true : false}
              {...getFieldProps(AddStaffFormFields.PHONE_NUMBER)}
            />
            {getFieldErrorMessage(AddStaffFormFields.PHONE_NUMBER) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.PHONE_NUMBER)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Stack spacing="10px">
            <FormLabel id="label-email" className="form__label">
              Email
            </FormLabel>
            <CustomTextField
              required
              placeholder="Email"
              id="email"
              name="email"
              size="small"
              error={getFieldErrorMessage(AddStaffFormFields.EMAIL) ? true : false}
              {...getFieldProps(AddStaffFormFields.EMAIL)}
            />
            {getFieldErrorMessage(AddStaffFormFields.EMAIL) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.EMAIL)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing="10px">
            <FormLabel id="label-address" className="form__label">
              Address
            </FormLabel>
            <CustomTextField
              required
              placeholder="Address"
              id="address"
              name="address"
              size="small"
              error={getFieldErrorMessage(AddStaffFormFields.ADDRESS) ? true : false}
              {...getFieldProps(AddStaffFormFields.ADDRESS)}
            />
            {getFieldErrorMessage(AddStaffFormFields.ADDRESS) ? (
              <Typography variant="h6" sx={{ color: COLOR_CODE.DANGER }}>
                {getFieldErrorMessage(AddStaffFormFields.ADDRESS)}
              </Typography>
            ) : null}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Button
              variant="outlined"
              color="inherit"
              type="button"
              disabled={isLoading}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button variant="contained" disabled={isLoading} type="submit">
              Add
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </form>
  );
};

export default NewStaffForm;
