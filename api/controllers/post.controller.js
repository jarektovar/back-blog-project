import { errorHandler } from '../utils/error.js';
import Post from '../models/post.model.js';

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'No autorizado a crear un post'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Todos los campos son requeridos'));
  }

  const slug = req.body.title
    .toLowerCase()
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
