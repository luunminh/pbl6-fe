import { TableParams } from '@components/common/Table';
import { MetadataType, UserType } from '@queries/OrderRequest';

export type OrderListParams = TableParams;

export enum OrderStatusId {
  PENDING_CONFIRM = 1,
  CONFIRMED = 2,
  COMPLETED = 3,
  PENDING_PAYMENT = 4,
  PAYMENT_CONFIRMED = 5,
  CANCELED = 6,
}

export const OrderStatus = {
  [OrderStatusId.PENDING_CONFIRM]: 'Pending',
  [OrderStatusId.CONFIRMED]: 'Confirmed',
  [OrderStatusId.COMPLETED]: 'Completed',
  [OrderStatusId.PENDING_PAYMENT]: 'Pending payment',
  [OrderStatusId.PAYMENT_CONFIRMED]: 'Paid',
  [OrderStatusId.CANCELED]: 'Cancelled',
};

export enum PaymentMethod {
  COD = 'COD',
  BANKING = 'BANKING',
}

export const PaymentMethodTitle = {
  [PaymentMethod.COD]: 'COD',
  [PaymentMethod.BANKING]: 'VNPay',
};

type VoucherType = {
  id: string;
  code: string;
  minValueOrder: number;
  discountValue: number;
  type: string;
  createdAt: string;
};

type ProductType = {
  id: string;
  name: string;
  image: string;
  description: string;
  amount: number;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

type OrderDetailsType = {
  id: string;
  quantity: number;
  orderPrice: number;
  productStoreId: string;
  orderId: string;
  product: ProductType;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export interface OrderResponse {
  id: string;
  total: number;
  shipping: number;
  user: UserType;
  voucher: VoucherType;
  orderStatusId: number;
  paymentMethod: string;
  orderDetails: OrderDetailsType[]; // product list in an order
  metadata: MetadataType;
  subTotal: number;
  discountValue: number;
  createdAt: string;
}
