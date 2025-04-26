import { orderMock } from 'src/order/__mocks__/order.mock';
import { groupOrder } from '../dto/returnGroupOrder.dto';

export const groupOrderMock: groupOrder = {
  order_id: orderMock.id,
  total: '5',
};
