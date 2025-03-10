import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any;
}

export interface OrderDetails {
  productId: string;
  quantity: number;
  price?: number;
}


export interface User {
  id: number;
  email: string;
}
