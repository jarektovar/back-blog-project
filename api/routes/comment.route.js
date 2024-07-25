import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { createComment, getPostComments, likeComment, editComment, deleteComment, getcomments } from '../controllers/comment.controller.js';

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Endpoints relacionados con los comentarios
 */

const router = express.Router();

/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario creado exitosamente
 *       403:
 *         description: No autorizado
 *       400:
 *         description: Solicitud incorrecta
 */
router.post('/create', verifyToken, createComment);

/**
 * @swagger
 * /api/comment/getPostComments/{postId}:
 *   get:
 *     summary: Obtener comentarios de un post
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del post
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *       400:
 *         description: Solicitud incorrecta
 */
router.get('/getPostComments/:postId', getPostComments);

/**
 * @swagger
 * /api/comment/likeComment/{commentId}:
 *   put:
 *     summary: Dar o quitar 'me gusta' a un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *       403:
 *         description: No autorizado
 *       400:
 *         description: Solicitud incorrecta
 */
router.put('/likeComment/:commentId', verifyToken, likeComment);

/**
 * @swagger
 * /api/comment/editComment/{commentId}:
 *   put:
 *     summary: Editar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado exitosamente
 *       403:
 *         description: No autorizado
 *       400:
 *         description: Solicitud incorrecta
 */
router.put('/editComment/:commentId', verifyToken, editComment);

/**
 * @swagger
 * /api/comment/deleteComment/{commentId}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del comentario
 *     responses:
 *       200:
 *         description: Comentario eliminado exitosamente
 *       403:
 *         description: No autorizado
 */
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);

/**
 * @swagger
 * /api/comment/getcomments:
 *   get:
 *     summary: Obtener lista de comentarios
 *     tags: [Comentarios]
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
 *         description: Límite de comentarios a devolver
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Orden de los resultados
 *     responses:
 *       200:
 *         description: Lista de comentarios obtenida exitosamente
 *       403:
 *         description: No autorizado
 */
router.get('/getcomments', verifyToken, getcomments);

export default router;