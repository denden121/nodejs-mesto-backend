import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CONFLICT,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} from 'constants/httpStatus';

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = 'Переданы некорректные данные') {
    super(message, HTTP_STATUS_BAD_REQUEST);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Необходима авторизация') {
    super(message, HTTP_STATUS_UNAUTHORIZED);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string = 'Доступ запрещен') {
    super(message, HTTP_STATUS_FORBIDDEN);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Ресурс не найден') {
    super(message, HTTP_STATUS_NOT_FOUND);
  }
}

export class ConflictError extends AppError {
  constructor(message: string = 'Конфликт данных') {
    super(message, HTTP_STATUS_CONFLICT);
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Внутренняя ошибка сервера') {
    super(message, HTTP_STATUS_INTERNAL_SERVER_ERROR);
  }
}
