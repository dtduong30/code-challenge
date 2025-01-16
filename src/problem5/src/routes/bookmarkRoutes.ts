import { Router } from 'express';
import { createBookmark, getBookmark, getBookmarks, updateBookmark, deleteBookmark } from '../controllers/bookmarkController';
import validate from '../shared/common/validator';
import { bookmarkPayloadCreateValidator, bookmarkPayloadUpdateValidator, bookmarkIdValidator } from '../validations/bookmark';
import { commonQuery } from '../validations/query';
const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Bookmark:
 *       type: object
 *       required:
 *         - url
 *         - title
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique id of the bookmark
 *         url:
 *           type: string
 *           description: The URL of the bookmark
 *         title:
 *           type: string
 *           description: The title of the bookmark
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: The tags associated with the bookmark
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the bookmark was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the bookmark was last updated
 *       example:
 *         _id: 6047e3e2b8f6b5f2b8e3f4b1
 *         url: 'https://example.com'
 *         title: 'Example'
 *         tags: ['example', 'bookmark']
 *         createdAt: '2021-03-10T04:05:06.157Z'
 *         updatedAt: '2021-03-10T04:05:06.157Z'
 */

/**
 * @swagger
 * tags:
 *   name: Bookmarks
 *   description: The bookmarks managing API
 */

/**
 * @swagger
 * /api/bookmarks:
 *   post:
 *     summary: Create a new bookmark
 *     tags: [Bookmarks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bookmark'
 *     responses:
 *       201:
 *         description: The bookmark was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bookmark'
 *       400:
 *         description: Bad request
 */
router.post('/', validate(bookmarkPayloadCreateValidator), createBookmark);

/**
 * @swagger
 * /api/bookmarks:
 *   get:
 *     summary: List of all the bookmarks with basic filter
 *     tags: [Bookmarks]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: The number of items per page
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           default: createdAt
 *         description: The field to sort by
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *           default: asc
 *         description: The sort order (asc or desc)
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: The search term
 *     responses:
 *       200:
 *         description: The list of the bookmarks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bookmark'
 */
router.get('/', validate(commonQuery), getBookmarks);

/**
 * @swagger
 * /api/bookmarks/{id}:
 *   get:
 *     summary: Get details of bookmark
 *     tags: [Bookmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bookmark id
 *     responses:
 *       200:
 *         description: The bookmark details by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bookmark'
 *       404:
 *         description: The bookmark was not found
 */
router.get('/:id', validate(bookmarkIdValidator), getBookmark);

/**
 * @swagger
 * /api/bookmarks/{id}:
 *   put:
 *     summary: Update the bookmark details
 *     tags: [Bookmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bookmark id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bookmark'
 *     responses:
 *       200:
 *         description: The bookmark was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bookmark'
 *       404:
 *         description: The bookmark was not found
 *       400:
 *         description: Bad request
 */
router.put('/:id', validate(bookmarkIdValidator), validate(bookmarkPayloadUpdateValidator), updateBookmark);

/**
 * @swagger
 * /api/bookmarks/{id}:
 *   delete:
 *     summary: Delete the bookmark
 *     tags: [Bookmarks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The bookmark id
 *     responses:
 *       200:
 *         description: The bookmark was deleted
 *       404:
 *         description: The bookmark was not found
 */
router.delete('/:id', validate(bookmarkIdValidator), deleteBookmark);

export default router;