import type { NextFunction, Request, Response } from 'express';
import { Card } from 'models/card';
import {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
} from 'constants/httpStatus';
import {
  NotFoundError,
  ForbiddenError,
} from 'errors';

export class CardController {
  static getAll = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cards = await Card.find({});

      res.status(HTTP_STATUS_OK).json(cards);
    } catch (error: unknown) {
      next(error);
    }
  };

  static deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { cardId } = req.params;
      const userId = req.user!._id;

      const card = await Card.findById(cardId);

      if (!card) {
        return next(new NotFoundError('Карточка с указанным _id не найдена'));
      }

      if (!card.owner.equals(userId)) {
        return next(new ForbiddenError('Вы не можете удалить эту карточку'));
      }

      await Card.deleteOne({ _id: cardId });

      res.status(HTTP_STATUS_OK).json({
        message: 'Карточка успешно удалена',
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  static create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const cardData = req.body;

      const newCard = new Card({ ...cardData, owner: req.user!._id });

      const savedCard = await newCard.save();

      res.status(HTTP_STATUS_CREATED).json(savedCard);
    } catch (error: unknown) {
      next(error);
    }
  };

  static createLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id;

      const { cardId } = req.params;
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { $addToSet: { likes: userId } },
        { new: true },
      );

      if (!updatedCard) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }

      res.status(HTTP_STATUS_OK).json(updatedCard);
    } catch (error: unknown) {
      next(error);
    }
  };

  static deleteLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = req.user!._id;

      const { cardId } = req.params;
      const updatedCard = await Card.findByIdAndUpdate(
        cardId,
        { $pull: { likes: userId } },
        { new: true },
      );

      if (!updatedCard) {
        return next(new NotFoundError('Передан несуществующий _id карточки'));
      }

      res.status(HTTP_STATUS_OK).json(updatedCard);
    } catch (error: unknown) {
      next(error);
    }
  };
}
