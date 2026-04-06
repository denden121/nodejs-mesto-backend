import type { NextFunction, Request, Response } from 'express';
import { User } from 'models/user';
import { JWTService } from 'helpers/jwtService';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} from 'constants/httpStatus';
import {
  NotFoundError,
  ConflictError,
  UnauthorizedError,
} from 'errors';

export class UserController {
  static getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await User.find({});

      res.status(HTTP_STATUS_OK).json(users);
    } catch (error: unknown) {
      next(error);
    }
  };

  static getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userId } = req.params;

      const foundUser = await User.findById(userId);

      if (!foundUser) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }

      res.status(HTTP_STATUS_OK).json(foundUser);
    } catch (error: unknown) {
      next(error);
    }
  };

  static register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;

      const tempUser = new User(userData);
      const hashedPassword = await tempUser.hashPassword(userData.password);

      const newUser = new User({ ...userData, password: hashedPassword });

      const savedUser = await newUser.save();
      const { password: _, ...userWithoutPassword } = savedUser.toObject();

      res.status(HTTP_STATUS_CREATED).json(userWithoutPassword);
    } catch (error: unknown) {
      next(error);
    }
  };

  static updateAvatar = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { avatar } = req.body;
      const userId = req.user!._id;

      const updatedUser = await User.findByIdAndUpdate(userId, { avatar }, { new: true });

      if (!updatedUser) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }

      res.status(HTTP_STATUS_OK).json(updatedUser);
    } catch (error: unknown) {
      next(error);
    }
  };

  static updateInfo = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, about } = req.body;
      const userId = req.user?._id;

      const updateData: { name?: string; about?: string } = {};
      if (name !== undefined) updateData.name = name;
      if (about !== undefined) updateData.about = about;

      const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

      if (!updatedUser) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }

      res.status(HTTP_STATUS_OK).json(updatedUser);
    } catch (error: unknown) {
      next(error);
    }
  };

  static getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id;

      const user = await User.findById(userId);

      if (!user) {
        return next(new NotFoundError('Пользователь по указанному _id не найден'));
      }

      res.status(HTTP_STATUS_OK).json(user);
    } catch (error: unknown) {
      next(error);
    }
  };

  static login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email }).select('+password');

      if (!user) {
        return next(new UnauthorizedError('Не верный email'));
      }

      const isValidPass = await user.verifyPassword(password, user.password);
      if (!isValidPass) {
        return next(new UnauthorizedError('Не верный пароль'));
      }

      const token = JWTService.generateToken({ userId: user._id });

      res.status(HTTP_STATUS_OK).json({ token });
    } catch (error: unknown) {
      next(error);
    }
  };
}
