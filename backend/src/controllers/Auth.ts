
import { prisma } from '../utils/db';
import { Request, Response } from 'express';
import { comparePassword, createJWT, hashPassword } from '../utils/auth';
import { AuthError, BadRequestError } from '../middleware/error';



export default class AuthController {
    static signUp = async (req: Request, res: Response) => {
        let { email, password } = req.body;
        let user = await prisma.user.findUnique({
            where: { email: req.body.email },
        });
        if (user) {
            throw new BadRequestError('Email already exists!');
        }
        user = await prisma.user.create({
            data: {
                email,
                password: await hashPassword(password),
            },
        });
        const User = {  email: user.email, id: user.id };
        const token = createJWT(user);
        res.json({ User, token });
    };

    static signIn = async (req: Request, res: Response) => {

        const user = await prisma.user.findUnique({  // check if user exist
            where: { email: req.body.email },
        });

        if (!user) throw new AuthError("Invalid Credentials!")

        const isValid = await comparePassword(req.body.password, user.password);

        if (!isValid) {
            throw new AuthError('Invalid Credentials!');
        }
        const token = createJWT(user);
        res.json({ token });
    };


}
