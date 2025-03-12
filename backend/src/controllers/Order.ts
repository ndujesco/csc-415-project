import { prisma } from '../utils/db';
import { Response } from 'express';
import { BadRequestError } from '../middleware/error';
import { AuthRequest } from '../utils/interface';
import { CreateOrderDTO, UpdateOrderDTO } from '../serializers/Order';

export default class OrderController {
    static createOrder = async (req: AuthRequest, res: Response) => {
        const { amount, address, productIds, email, status } = req.body as CreateOrderDTO;

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
        });

        if (!user) {
            throw new BadRequestError('User not found');
        }

        // Validate product IDs
        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        if (productIds.length !== products.length) {
            throw new BadRequestError('Some products were not found');
        }

        const newOrder = await prisma.order.create({
            data: {
                amount,
                address,
                email: email || user.email,
                userId: user.id,
                status: status || 'pending',
                products: { connect: products.map((p) => p) }
            },
        });


        res.json(newOrder);
    };


    static getOrders = async (req: AuthRequest, res: Response) => {
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
        });

        res.json(orders);
    };

    static getOrderById = async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id: parseInt(id), userId: req.user.id },
        });

        if (!order) {
            throw new BadRequestError('Order not found');
        }

        res.json(order);
    };

    static updateOrder = async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const { amount, address, productIds, status, email } = req.body as UpdateOrderDTO;

        const existingOrder = await prisma.order.findUnique({
            where: { id: parseInt(id), userId: req.user.id },
        });

        if (!existingOrder) {
            throw new BadRequestError('Order not found');
        }

        const products = await prisma.product.findMany({
            where: { id: { in: productIds } },
        });

        if (productIds.length !== products.length) {
            throw new BadRequestError('Some products were not found');
        }

        const updatedOrder = await prisma.order.update({
            where: { id: parseInt(id) },
            data: {
                amount,
                address,
                products: { set: products }, // Ensure array update works
                status,
                email
            },
        });

        res.json(updatedOrder);
    };

    static deleteOrder = async (req: AuthRequest, res: Response) => {
        const { id } = req.params;

        const existingOrder = await prisma.order.findUnique({
            where: { id: parseInt(id), userId: req.user.id },
        });

        if (!existingOrder) {
            throw new BadRequestError('Order not found');
        }

        await prisma.order.delete({
            where: { id: parseInt(id) },
        });

        res.json({ message: 'Order deleted successfully' });
    };
}
