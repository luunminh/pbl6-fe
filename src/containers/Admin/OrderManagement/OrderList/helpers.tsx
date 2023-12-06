import { Chip } from '@mui/material';
import { OrderStatus, OrderStatusId } from '@queries';
import { getCapitalize, isEmpty } from '@shared';

export const customOrderStatusRender = (orderStatusId: number) => {
  if (isEmpty(orderStatusId)) return '--';
  switch (orderStatusId) {
    case OrderStatusId.PENDING_CONFIRM:
      return (
        <Chip label={getCapitalize(OrderStatus[OrderStatusId.PENDING_CONFIRM])} color="warning" />
      );
    case OrderStatusId.CONFIRMED:
      return <Chip label={getCapitalize(OrderStatus[OrderStatusId.CONFIRMED])} color="success" />;
    case OrderStatusId.CANCELED:
      return <Chip label={getCapitalize(OrderStatus[OrderStatusId.CANCELED])} color="error" />;
    default:
      return '--';
  }
};
