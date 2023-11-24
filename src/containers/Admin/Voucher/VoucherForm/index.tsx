import {
  CurrencyInput,
  DatePicker,
  DialogContext,
  Input,
  MuiTextField,
  SegmentedButton,
} from '@components';
import { Button, Grid, Stack } from '@mui/material';
import { useFormik } from 'formik';
import {
  VoucherFormField,
  VoucherFormType,
  voucherFormInitValue,
  voucherFormSchema,
  voucherTypeOptions,
} from './helpers';
import {
  VoucherType,
  useAddVoucher,
  useGetVoucherDetail,
  useGetVouchers,
  useUpdateVoucher,
} from '@queries';
import { Toastify, getErrorMessage, handleKeyDownNumberInput, isEmpty } from '@shared';
import { useContext, useMemo, useState } from 'react';

const VoucherForm = ({ voucherId, isEditing, readOnly }: Props) => {
  const { closeModal } = useContext(DialogContext);
  const [segmentedButtonValue, setSegmentedButtonValue] = useState(VoucherType.FIXED);

  const {
    voucherDetail,
    isLoading: isFetchingVoucherDetail,
    handleInvalidateVoucherDetail,
  } = useGetVoucherDetail({
    id: voucherId,
    onSuccessCallback() {
      setSegmentedButtonValue(voucherDetail.type as VoucherType);
    },
  });

  const { handleInvalidateVouchers } = useGetVouchers();

  const { addVoucher, isLoading: isAddingVoucher } = useAddVoucher({
    onSuccess() {
      handleInvalidateVoucherDetail();
      handleInvalidateVouchers();
      Toastify.success('New voucher has been added successfully!');
      closeModal();
    },
    onError(error) {
      Toastify.error(error?.message);
    },
  });

  const { updateVoucher, isLoading: isUpdatingVoucher } = useUpdateVoucher({
    onSuccess() {
      handleInvalidateVoucherDetail();
      handleInvalidateVouchers();
      Toastify.success('New voucher has been added successfully!');
      closeModal();
    },
    onError(error) {
      Toastify.error(error.message);
    },
  });

  const getInitValue = useMemo(() => {
    if ((isEditing || readOnly) && !isEmpty(voucherDetail)) {
      return voucherDetail;
    }
    return voucherFormInitValue;
  }, [isEditing, voucherDetail, readOnly]);

  const handleFormSubmit = (formValues: VoucherFormType) => {
    if (isEditing) {
      updateVoucher({ ...formValues, type: segmentedButtonValue });
    } else {
      addVoucher({ ...formValues, type: segmentedButtonValue });
    }
  };

  const getFieldErrorMessage = (fieldName: string) =>
    getErrorMessage(fieldName, { touched, errors });

  const { errors, touched, getFieldProps, handleSubmit, setFieldValue, values, setFieldTouched } =
    useFormik<VoucherFormType>({
      initialValues: getInitValue,
      onSubmit: handleFormSubmit,
      validationSchema: voucherFormSchema(segmentedButtonValue),
      enableReinitialize: true,
    });

  const handleChangeMinimumOrder = (_, value) => {
    setFieldValue(VoucherFormField.MIN_VALUE_ORDER, value);
  };

  const handleChangeDiscountValue = (_, value) => {
    setFieldValue(VoucherFormField.DISCOUNT_VALUE, value);
  };

  const isLoading = isFetchingVoucherDetail || isAddingVoucher || isUpdatingVoucher;

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <MuiTextField
              required
              label="Voucher Code"
              errorMessage={getFieldErrorMessage(VoucherFormField.CODE)}
              placeholder="Enter voucher code"
              fullWidth
              size="small"
              readOnly={readOnly}
              {...getFieldProps(VoucherFormField.CODE)}
            />
          </Grid>
          <Grid item xs={12}>
            <MuiTextField
              required
              label="Description"
              errorMessage={getFieldErrorMessage(VoucherFormField.DESC)}
              fullWidth
              multiline
              size="small"
              readOnly={readOnly}
              {...getFieldProps(VoucherFormField.DESC)}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              required
              label="Quantity"
              type="number"
              errorMessage={getFieldErrorMessage(VoucherFormField.QUANTITY)}
              readOnly={readOnly}
              {...getFieldProps(VoucherFormField.QUANTITY)}
            />
          </Grid>
          <Grid item xs={6}>
            <Stack flexDirection={'row'} alignItems={'end'} gap={2}>
              <Grid item xs={8}>
                <CurrencyInput
                  required
                  label="Discount value"
                  errorMessage={getFieldErrorMessage(VoucherFormField.DISCOUNT_VALUE)}
                  readOnly={readOnly}
                  prefix=""
                  {...getFieldProps(VoucherFormField.DISCOUNT_VALUE)}
                  onChange={handleChangeDiscountValue}
                  onKeyDown={handleKeyDownNumberInput}
                  decimalScale={0}
                />
              </Grid>
              <Grid item xs={3.5}>
                <SegmentedButton
                  disabled={readOnly}
                  fullWidth
                  style={{
                    marginBottom: !isEmpty(getFieldErrorMessage(VoucherFormField.DISCOUNT_VALUE))
                      ? '36px'
                      : 0,
                  }}
                  items={voucherTypeOptions}
                  value={segmentedButtonValue}
                  onChange={(_, value) => setSegmentedButtonValue(value)}
                />
              </Grid>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <CurrencyInput
              required
              label="Minimum order value"
              errorMessage={getFieldErrorMessage(VoucherFormField.MIN_VALUE_ORDER)}
              readOnly={readOnly}
              prefix="VND "
              {...getFieldProps(VoucherFormField.MIN_VALUE_ORDER)}
              onChange={handleChangeMinimumOrder}
              onKeyDown={handleKeyDownNumberInput}
              decimalScale={0}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              readOnly={readOnly}
              required
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              selected={values.startDate ? new Date(values.startDate) : null}
              label="Start Date"
              placeholder="Select"
              {...getFieldProps(VoucherFormField.START_DATE)}
              errorMessage={getFieldErrorMessage(VoucherFormField.START_DATE)}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              maxDate={!isEmpty(values.endDate) ? new Date(values.endDate) : null}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              readOnly={readOnly}
              required
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
              selected={values.endDate ? new Date(values.endDate) : null}
              label="Expiration Date"
              placeholder="Select"
              {...getFieldProps(VoucherFormField.EXP_DATE)}
              errorMessage={getFieldErrorMessage(VoucherFormField.EXP_DATE)}
              onChange={setFieldValue}
              onBlur={setFieldTouched}
              minDate={!isEmpty(values.startDate) ? new Date(values.startDate) : null}
            />
          </Grid>
        </Grid>
        {!readOnly && (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{
              padding: '8px 0px',
              gap: 2,
              borderRadius: '0 0 16px 16px',
            }}
          >
            <Button variant="outlined" color="inherit" onClick={closeModal} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} variant="contained" color="primary">
              {isEditing ? 'Save' : 'Add'}
            </Button>
          </Stack>
        )}
      </Stack>
    </form>
  );
};

type Props = {
  voucherId?: string;
  isEditing?: boolean;
  readOnly?: boolean;
};
export default VoucherForm;
