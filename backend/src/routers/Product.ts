import { Router } from 'express';
import ProductController from '../controllers/Product';
import RequestValidator from '../middleware/validation';
import { CreateProductDTO, UpdateProductDTO } from '../serializers/Product';
import { protect } from '../middleware/auth';
import { IdParamDTO } from '../serializers/Param';

const productRouter = Router();

productRouter.post('/', protect, RequestValidator.validate(CreateProductDTO), ProductController.createProduct);
productRouter.get('/', protect, ProductController.getProducts);
productRouter.get('/:id', protect, RequestValidator.validate(IdParamDTO, 'params'), ProductController.getProductById);
productRouter.put('/:id', protect, RequestValidator.validate(IdParamDTO, 'params'), RequestValidator.validate(UpdateProductDTO), ProductController.updateProduct);
productRouter.delete('/:id', protect, RequestValidator.validate(IdParamDTO, 'params'), ProductController.deleteProduct);

export default productRouter;
