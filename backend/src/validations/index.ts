import Joi from 'joi';
import { Segments } from 'celebrate';

// Валидация MongoDB ObjectId
const objectIdSchema = Joi.string().hex().length(24).required();

const urlPattern = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+(\/.*)?$/;

export const cardValidations = {
  cardId: {
    [Segments.PARAMS]: Joi.object({
      cardId: objectIdSchema,
    }),
  },
  createCard: {
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().pattern(urlPattern).required()
        .messages({
          'string.pattern.base': 'Некорректный формат URL для поля link',
        }),
    }),
  },
};

export const userValidations = {
  userId: {
    [Segments.PARAMS]: Joi.object({
      userId: objectIdSchema,
    }),
  },
  updateUserInfo: {
    [Segments.BODY]: Joi.object({
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(200).optional(),
    }).or('name', 'about'),
  },
  updateAvatar: {
    [Segments.BODY]: Joi.object({
      avatar: Joi.string().pattern(urlPattern).required()
        .messages({
          'string.pattern.base': 'Некорректный формат URL для поля avatar',
        }),
    }),
  },
  register: {
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30).optional(),
      about: Joi.string().min(2).max(200).optional(),
      avatar: Joi.string().pattern(urlPattern).optional()
        .messages({
          'string.pattern.base': 'Некорректный формат URL для поля avatar',
        }),
    }),
  },
  login: {
    [Segments.BODY]: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  },
};
