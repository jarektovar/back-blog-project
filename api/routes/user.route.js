import { Router } from 'express';
import {
  deleteUser,
  getUser,
  getUsers,
  signout,
  test,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints relacionados con los usuarios
 */

const router = Router();

/**
 * @swagger
 * /api/user/test:
 *   get:
 *     summary: Prueba de funcionamiento
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Prueba exitosa
 */
router.get('/test', test);

/**
 * @swagger
 * /api/user/update/{userId}:
 *   put:
 *     summary: Actualizar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
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
 *               profilePicture:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       403:
 *         description: No autorizado
 *       400:
 *         description: Solicitud incorrecta
 */
router.put('/update/:userId', verifyToken, updateUser);

/**
 * @swagger
 * /api/user/delete/{userId}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *       403:
 *         description: No autorizado
 */
router.delete('/delete/:userId', verifyToken, deleteUser);

/**
 * @swagger
 * /api/user/signout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso
 */
router.post('/signout', signout);

/**
 * @swagger
 * /api/user/getusers:
 *   get:
 *     summary: Obtener lista de usuarios
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: startIndex
 *         schema:
 *           type: integer
 *         description: Índice de inicio para la paginación
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de usuarios a devolver
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Orden de los resultados
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *       403:
 *         description: No autorizado
 */
router.get('/getusers', verifyToken, getUsers);


router.delete('/deleteusers', verifyToken, deleteUser)
//route.get('/:userId', getUsers)
router.get('/:userId', getUser)

export default router;
