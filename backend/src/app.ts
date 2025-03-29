import express from 'express';
import { Application } from 'express';
import cors from 'cors'


import helloRouter from './routers/Hello';
import { ErrorHandler } from './middleware/error';
import authRouter from './routers/Auth';
import orderRouter from './routers/Order';
import productRouter from './routers/Product';

const app: Application = express();

app.use('*', cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', helloRouter);
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/order', orderRouter)
app.use('/api/v1/product', productRouter)


app.use('*', ErrorHandler.pagenotFound());
app.use(ErrorHandler.handle());
ErrorHandler.exceptionRejectionHandler();

export default app;