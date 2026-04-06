import type { NextFunction, Request, Response } from 'express';
import { JWTService } from 'helpers/jwtService';
import { UnauthorizedError } from 'errors';

export const authMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.startsWith('Bearer ') ? authorization.slice(7) : req.cookies?.token;

    if (!token) {
      return next(new UnauthorizedError('Токен не предоставлен'));
    }

    const decoded = JWTService.verifyToken(token);

    req.user = {
      _id: decoded.userId,
    };
    next();
  } catch {
    return next(new UnauthorizedError('Не валидный токен'));
  }
};
