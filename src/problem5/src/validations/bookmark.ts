import { body, param } from 'express-validator';

export const bookmarkPayloadCreateValidator = [
  body('url').isURL().withMessage('URL is invalid'),
  body('title').isString().notEmpty().withMessage('Title is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
]

export const bookmarkPayloadUpdateValidator = [
  body('url').optional().isURL().withMessage('URL is invalid'),
  body('title').optional().isString().notEmpty().withMessage('Title is required'),
  body('tags').optional().isArray().withMessage('Tags must be an array of strings'),
]

export const bookmarkIdValidator = [
  param('id').isMongoId().withMessage('Invalid bookmark ID'),
]