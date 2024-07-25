import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletepost, getposts, updatepost } from '../controllers/post.controller.js';


/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Endpoints relacionados con los posts
 */

const router = express.Router();

/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Crear un nuevo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post creado exitosamente
 *       403:
 *         description: No autorizado
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/create', verifyToken, createPost);

/**
 * @swagger
 * /api/post/getposts:
 *   get:
 *     summary: Obtener lista de posts
 *     tags: [Posts]
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
 *         description: Límite de posts a devolver
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Orden de los resultados
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: ID del usuario
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Categoría del post
 *       - in: query
 *         name: slug
 *         schema:
 *           type: string
 *         description: Slug del post
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: ID del post
 *       - in: query
 *         name: searchTerm
 *         schema:
 *           type: string
 *         description: Término de búsqueda
 *     responses:
 *       200:
 *         description: Lista de posts obtenida exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.get('/getposts', getposts);

/**
 * @swagger
 * /api/post/deletepost/{postId}/{userId}:
 *   delete:
 *     summary: Eliminar un post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Post eliminado exitosamente
 *       403:
 *         description: No autorizado
 */
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost);

/**
 * @swagger
 * /api/post/updatepost/{postId}/{userId}:
 *   put:
 *     summary: Actualizar un post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post
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
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               category:
 *                 type: string
 *               image:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post actualizado exitosamente
 *       403:
 *         description: No autorizado
 *       400:
 *         description: Solicitud incorrecta
 */
router.put('/updatepost/:postId/:userId', verifyToken, updatepost);

export default router;


