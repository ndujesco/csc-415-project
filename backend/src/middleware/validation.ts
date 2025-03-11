import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { BadRequestError } from '../middleware/error';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export default class RequestValidator {
    static validate = <T extends object>(
      classInstance: ClassConstructor<T>,
      location: 'body' | 'params' = 'body'
    ) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        const objectClass = plainToInstance(classInstance, req[location]);
        const errors = await validate(objectClass);

        if (errors.length > 0) {
          const rawErrors: string[] = errors.flatMap(error => 
            Object.values(error.constraints ?? [])
          );

          console.error(rawErrors);
          return next(new BadRequestError('Input validation failed!', rawErrors));
        }

        next();
      };
    };
}
