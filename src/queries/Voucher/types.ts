export type GetVouchersResponse = {
  id: string;
  code: string;
  description: string;
  minValueOrder: number;
  type: string;
  discountValue: number;
  startDate: string;
  endDate: string;
  status?: string;
};

export enum VoucherStatus {
  VALID = 'valid',
  EXPIRED = 'expired',
}

export enum VoucherType {
  PERCENTAGE = 'percentage ',
  FIXED = 'fixed',
}
