import { Router } from 'express';
import AuthController from '../controllers/Auth';
import 'express-async-errors';
import RequestValidator from '../middleware/validation';
import { Auth } from '../serializers/Auth';

const authRouter = Router();

authRouter.post('/signup', RequestValidator.validate(Auth), AuthController.signUp);
authRouter.post('/login', RequestValidator.validate(Auth), AuthController.signIn);


export default authRouter;