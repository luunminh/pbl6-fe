import { VoucherStatus } from '@queries';
import { getTitleCase } from '@shared';

export const VoucherStatusOptions = [
  {
    value: VoucherStatus.VALID,
    label: getTitleCase(VoucherStatus.VALID),
  },
  {
    value: VoucherStatus.EXPIRED,
    label: getTitleCase(VoucherStatus.EXPIRED),
  },
];

export type VoucherFilterFormType = {
  valid: string;
};

export enum VoucherFilterFormField {
  VALID = 'valid',
}

export const voucherFilterFormInitValue = {
  valid: null,
};
