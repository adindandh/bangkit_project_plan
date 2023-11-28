
const express = require('express');
const router = express.Router();
const { createAksara, readAksara, listAllAksara } = require('../controllers/aksaraController');
const { check, validationResult } = require('express-validator');

// Middleware to validate inputs
const validateInputs = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
/**
* @swagger
* /aksara:
*   post:
*     summary: Create a new Aksara
*     tags: [Aksara]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Aksara'
*     responses:
*       200:
*         description: The Aksara was successfully created
*       500:
*         description: Some server error
*/
router.post('/', [
  check('name').notEmpty(),
  check('urlImage').notEmpty(),
  validateInputs
], createAksara);

/**
 * @swagger
 * /aksara/{id}:
 *   get:
 *     summary: Get an Aksara by ID
 *     tags: [Aksara]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful operation
 *       404:
 *         description: Aksara not found
 *       500:
 *         description: Some server error
 */
router.get('/:id', readAksara);

/**
 * @swagger
 * /aksara:
 *   get:
 *     summary: Get all Aksara
 *     tags: [Aksara]
 *     responses:
 *       200:
 *         description: Successful operation
 *       500:
 *         description: Some server error
 */
router.get('/', listAllAksara);

module.exports = router;
