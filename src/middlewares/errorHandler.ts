import type { Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppError } from 'errors';
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} from 'constants/httpStatus';

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
): void => {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
    });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(HTTP_STATUS_BAD_REQUEST).json({
      message: 'Передан некорректный _id',
    });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(HTTP_STATUS_BAD_REQUEST).json({
      message: 'Переданы некорректные данные',
    });
    return;
  }

  if (
    error instanceof Error
    && 'code' in error
    && error.code === 11000
  ) {
    res.status(HTTP_STATUS_CONFLICT).json({
      message: 'Пользователь с таким email уже существует',
    });
    return;
  }

  if (error instanceof Error && error.name === 'JsonWebTokenError') {
    res.status(HTTP_STATUS_UNAUTHORIZED).json({
      message: 'Не валидный токен',
    });
    return;
  }

  // Обработка неизвестных ошибок
  res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).json({
    message: error instanceof Error ? error.message : 'Внутренняя ошибка сервера',
  });
};
