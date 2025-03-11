import { Router } from 'express';
import AuthController from '../controllers/Auth';
import 'express-async-errors';
import RequestValidator from '../middleware/validation';
import { AuthDTO } from '../serializers/Auth';

const authRouter = Router();

authRouter.post('/signup', RequestValidator.validate(AuthDTO), AuthController.signUp);
authRouter.post('/login', RequestValidator.validate(AuthDTO), AuthController.signIn);


export default authRouter;