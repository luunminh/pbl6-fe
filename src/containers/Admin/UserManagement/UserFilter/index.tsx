import { COLOR_CODE } from '@components';
import {
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { isEmpty } from '@shared';
import { Field, Form, FormikProvider, useFormik } from 'formik';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FormValue,
  USER_FILTER_QUERY_KEY,
  UserRoleOptions,
  emptyFormValueFilter,
} from '../UserList/helpers';

const UserFilter: React.FC<Props> = ({ searchValues, handleClosePopup }) => {
  const navigate = useNavigate();
  const { search } = useLocation();

  const query = useMemo(() => new URLSearchParams(search), [search]);

  const handleSubmitSearchAndFilter = (values: FormValue) => {
    const { roles, active } = values;
    if (!isEmpty(roles)) {
      query.delete(USER_FILTER_QUERY_KEY._USER_ROLE);
      roles.forEach((item) => {
        query.append(USER_FILTER_QUERY_KEY._USER_ROLE, item.toString());
      });
    } else {
      query.delete(USER_FILTER_QUERY_KEY._USER_ROLE);
    }
    query.delete(USER_FILTER_QUERY_KEY._STATUS);
    console.log('active', active);
    if (active === 'true') {
      query.append(USER_FILTER_QUERY_KEY._STATUS, 'true');
    } else if (active === 'false') {
      query.append(USER_FILTER_QUERY_KEY._STATUS, 'false');
    }
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const handleClearAll = () => {
    setValues({
      ...emptyFormValueFilter,
    });
    Object.keys(emptyFormValueFilter).forEach((key) => {
      query.delete(key);
    });
    navigate({ search: query.toString() });
    handleClosePopup();
  };

  const initialValue: FormValue = useMemo(
    () => ({
      roles: searchValues.roles || [],
      active: searchValues.active || null,
    }),
    [searchValues],
  );

  const formik = useFormik<FormValue>({
    initialValues: initialValue,
    onSubmit: handleSubmitSearchAndFilter,
  });
  const { setValues, handleSubmit, getFieldProps, values, setFieldValue } = formik;

  console.log('values', values);

  return (
    <Container maxWidth="xs" sx={{ p: 2 }}>
      <Stack direction="row" alignItems="flex-end" mb={2} justifyContent="space-between">
        <Typography variant="h3" mr={3} color={COLOR_CODE.GREY_900} fontWeight="bold">
          Filters
        </Typography>
      </Stack>

      <FormikProvider value={formik}>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack
                direction="column"
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                }}
              >
                <Typography
                  fontWeight={700}
                  bgcolor={COLOR_CODE.GREY_50}
                  p={1}
                  borderRadius="8px 8px 0 0"
                >
                  Role
                </Typography>
                {UserRoleOptions?.map((role) => (
                  <Field
                    type="checkbox"
                    name="roles"
                    value={role.value}
                    key={role.value}
                    as={FormControlLabel}
                    control={<Checkbox sx={{ mx: 2 }} />}
                    checked={values?.roles?.includes(role.value)}
                    label={role.label}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFieldValue('roles', [...values.roles, role.value]);
                      } else {
                        setFieldValue(
                          'roles',
                          values.roles.filter((item) => item !== role.value),
                        );
                      }
                    }}
                  />
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="column"
                sx={{
                  border: `1px solid ${COLOR_CODE.GREY_300} `,
                  borderRadius: 2,
                }}
              >
                <Typography
                  fontWeight={700}
                  bgcolor={COLOR_CODE.GREY_50}
                  p={1}
                  borderRadius="8px 8px 0 0"
                >
                  Role
                </Typography>
                <RadioGroup
                  sx={{ display: 'flex', gap: 2, flexDirection: 'column', mx: 2 }}
                  {...getFieldProps(USER_FILTER_QUERY_KEY._STATUS)}
                  value={values?.active ?? null}
                >
                  <Stack flexDirection={'row'} alignItems={'center'} gap={3} mt={1}>
                    <Radio value={true} />
                    <Typography>Active</Typography>
                  </Stack>
                  <Stack flexDirection={'row'} alignItems={'center'} gap={3} mb={1}>
                    <Radio value={false} />
                    <Typography>Inactive</Typography>
                  </Stack>
                </RadioGroup>
              </Stack>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button variant="outlined" sx={{ mr: 2 }} onClick={handleClearAll}>
                Reset
              </Button>

              <Button variant="contained" color="primary" onClick={() => handleSubmit()}>
                Apply Filter
              </Button>
            </Grid>
          </Grid>
        </Form>
      </FormikProvider>
    </Container>
  );
};

type Props = {
  searchValues: FormValue;
  handleClosePopup?: (..._args: any[]) => void;
};

export default UserFilter;
