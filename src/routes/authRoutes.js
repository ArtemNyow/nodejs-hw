import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Auth
 *   description: Авторизація користувачів
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     summary: Реєстрація користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: Користувача створено
 */
router.post('/auth/register', celebrate(registerUserSchema), registerUser);

/**
 * @openapi
 * /auth/login:
 *   post:
 *     summary: Логін користувача
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Успішний вхід
 */
router.post('/auth/login', celebrate(loginUserSchema), loginUser);

/**
 * @openapi
 * /auth/refresh:
 *   post:
 *     summary: Оновлення сесії користувача
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Сесія оновлена
 */
router.post('/auth/refresh', refreshUserSession);

/**
 * @openapi
 * /auth/logout:
 *   post:
 *     summary: Вихід користувача
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Користувач вийшов
 */
router.post('/auth/logout', logoutUser);

/**
 * @openapi
 * /auth/request-reset-email:
 *   post:
 *     summary: Запит на скидання пароля
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@mail.com
 *     responses:
 *       200:
 *         description: Лист для скидання пароля відправлено
 */
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);

/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     summary: Скидання пароля
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: "reset-token-123"
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Пароль успішно скинуто
 */
router.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default router;
