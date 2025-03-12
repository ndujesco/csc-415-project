import { prisma } from '../utils/db';
import { Response } from 'express';
import { BadRequestError } from '../middleware/error';
import { AuthRequest } from '../utils/interface';
import { CreateProductDTO, UpdateProductDTO } from '../serializers/Product';

export default class ProductController {
    static createProduct = async (req: AuthRequest, res: Response) => {
        const { name, price, status, quantity, category } = req.body as CreateProductDTO;

        const newProduct = await prisma.product.create({
            data: { name, price, status, quantity, category },
        });

        res.json(newProduct);
    };

    static getProducts = async (req: AuthRequest, res: Response) => {
        const products = await prisma.product.findMany();
        res.json(products);
    };

    static getProductById = async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!product) {
            throw new BadRequestError('Product not found');
        }

        res.json(product);
    };

    static updateProduct = async (req: AuthRequest, res: Response) => {
        const { id } = req.params;
        const { name, price, status, quantity, category } = req.body as UpdateProductDTO;

        const existingProduct = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingProduct) {
            throw new BadRequestError('Product not found');
        }

        const updatedProduct = await prisma.product.update({
            where: { id: parseInt(id) },
            data: { name, price, status, quantity, category },
        });

        res.json(updatedProduct);
    };

    static deleteProduct = async (req: AuthRequest, res: Response) => {
        const { id } = req.params;

        const existingProduct = await prisma.product.findUnique({
            where: { id: parseInt(id) },
        });

        if (!existingProduct) {
            throw new BadRequestError('Product not found');
        }

        await prisma.product.delete({ where: { id: parseInt(id) } });

        res.json({ message: 'Product deleted successfully' });
    };
}
