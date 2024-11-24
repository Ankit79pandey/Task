const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { createShortUrl, getShortUrls, updateUrl, deleteUrl } = require('../controllers/urlController');

router.post('/create', authMiddleware, createShortUrl);
router.get('/', authMiddleware, getShortUrls);
router.put('/update', authMiddleware, updateUrl);
router.delete('/delete', authMiddleware, deleteUrl);

/**
 * @swagger
 * /api/urls/create:
 *   post:
 *     summary: Create a new short URL
 *     tags: [URLs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               originalUrl:
 *                 type: string
 *                 example: "https://example.com"
 *     responses:
 *       201:
 *         description: Successfully created short URL
 *       400:
 *         description: Bad Request
 */
router.post('/create', authMiddleware, createShortUrl);


module.exports = router;
