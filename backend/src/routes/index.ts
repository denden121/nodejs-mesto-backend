import { type Application, type Request, type Response } from 'express';

import { UserController } from 'controllers/users';
import { authMiddleware } from 'middlewares/authMiddleware';
import { celebrate } from 'celebrate';
import { userValidations } from 'validations';

import userRoutes from './users';
import cardRoutes from './cards';

const setupRoutes = (app: Application): void => {
  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello, TypeScript + Express');
  });

  // TODO: Remove after successful review
  app.get('/crash-test', () => {
    setTimeout(() => {
      throw new Error('Сервер сейчас упадёт');
    }, 0);
  });

  app.post('/signin', celebrate(userValidations.login), UserController.login);
  app.post('/signup', celebrate(userValidations.register), UserController.register);

  app.use(authMiddleware);

  app.use('/users', userRoutes);
  app.use('/cards', cardRoutes);
};

export default setupRoutes;
