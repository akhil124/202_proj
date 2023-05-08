/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The Users managing API
 * /create:
 *   post:
 *     summary: Create a new User
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/../models/user/'
 */