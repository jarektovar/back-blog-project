import { Router } from 'express';
import { signup, signin, google } from '../controllers/auth.controller.js';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Endpoints relacionados con la autenticación
 */

const router = Router();

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro exitoso
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/signup', signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       400:
 *         description: Solicitud incorrecta
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 */
router.post('/signin', signin);

/**
 * @swagger
 * /api/auth/google:
 *   post:
 *     summary: Autenticación con Google
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               googlePhotoUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/google', google);

export default router;
