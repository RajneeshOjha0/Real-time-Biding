const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/', itemController.getAllItems);
router.get('/:id', itemController.getItemById);
router.post('/', authenticateToken, itemController.createItem);
router.put('/:id', authenticateToken, itemController.updateItem);
router.delete('/:id', authenticateToken, authorizeRoles('admin'), itemController.deleteItem);

module.exports = router; // Ensure the router is being exported correctly   ..
