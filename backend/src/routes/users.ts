import { UserController } from 'controllers/users';
import express from 'express';
import { celebrate } from 'celebrate';
import { userValidations } from 'validations';

const router = express.Router();

router.get('/', UserController.getAll);
router.get('/me', UserController.getMe);
router.get('/:userId', celebrate(userValidations.userId), UserController.getById);
router.patch('/me', celebrate(userValidations.updateUserInfo), UserController.updateInfo);
router.patch('/me/avatar', celebrate(userValidations.updateAvatar), UserController.updateAvatar);

export default router;
