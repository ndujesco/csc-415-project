import { Router } from 'express';
import OrderController from '../controllers/Order';
import RequestValidator from '../middleware/validation';
import { CreateOrderDTO, UpdateOrderDTO } from '../serializers/Order';
import { protect } from '../middleware/auth';
import { IdParamDTO } from '../serializers/Param';

const orderRouter = Router();

orderRouter.post('/', protect, RequestValidator.validate(CreateOrderDTO), OrderController.createOrder);
orderRouter.get('/', protect, OrderController.getOrders);
orderRouter.get('/:id', protect, RequestValidator.validate(IdParamDTO, 'params'), OrderController.getOrderById);
orderRouter.put('/:id', protect, RequestValidator.validate(IdParamDTO, 'params'), RequestValidator.validate(UpdateOrderDTO), OrderController.updateOrder);
orderRouter.delete('/:id', protect, RequestValidator.validate(IdParamDTO, 'params'), OrderController.deleteOrder);

export default orderRouter;
