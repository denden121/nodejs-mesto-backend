import { CardController } from 'controllers/cards';
import express from 'express';
import { celebrate } from 'celebrate';
import { cardValidations } from 'validations';

const router = express.Router();

router.get('/', CardController.getAll);
router.delete('/:cardId', celebrate(cardValidations.cardId), CardController.deleteById);
router.post('/', celebrate(cardValidations.createCard), CardController.create);
router.put('/:cardId/likes', celebrate(cardValidations.cardId), CardController.createLike);
router.delete('/:cardId/likes', celebrate(cardValidations.cardId), CardController.deleteLike);

export default router;
