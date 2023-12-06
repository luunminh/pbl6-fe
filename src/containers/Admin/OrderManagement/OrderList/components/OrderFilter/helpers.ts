import { OrderStatus, OrderStatusId } from '@queries';
import { getCapitalize } from '@shared';

export enum ORDER_FILTER_QUERY_KEY {
  ORDER_STATUS_ID = 'orderStatusId',
}

export const filterParamsKey = [ORDER_FILTER_QUERY_KEY.ORDER_STATUS_ID];

export type OrderFilterFormFieldsType = {
  orderStatusId: number;
};

export const OrderStatusOptions = [
  {
    label: getCapitalize(OrderStatus[OrderStatusId.PAYMENT_CONFIRMED]),
    value: OrderStatusId.PENDING_CONFIRM,
  },
  {
    label: getCapitalize(OrderStatus[OrderStatusId.CONFIRMED]),
    value: OrderStatusId.CONFIRMED,
  },
  {
    label: getCapitalize(OrderStatus[OrderStatusId.CANCELED]),
    value: OrderStatusId.CANCELED,
  },
];
