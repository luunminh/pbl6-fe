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
  status: string;
};

export enum VoucherFilterFormField {
  STATUS = 'status',
}

export const voucherFilterFormInitValue = {
  status: '',
};
