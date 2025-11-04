import { Router } from 'express';
import { updateUserAvatar } from '../controllers/userController.js';
import { authenticate } from '../middleware/authenticate.js';
import { upload } from '../middleware/multer.js';

const router = Router();
/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Користувачі
 */

/**
 * @openapi
 * /users/me/avatar:
 *   patch:
 *     summary: Оновити аватар користувача
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Аватар успішно оновлено
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Аватар оновлено"
 *       401:
 *         description: Неавторизований
 */
router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  updateUserAvatar,
);

export default router;
