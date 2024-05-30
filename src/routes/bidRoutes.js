const express = require('express');
const router = express.Router();
const bidController = require('../controllers/bidController');
const { authenticateToken } = require('../middleware/auth');

router.get('/items/:itemId/bids', bidController.getBidsByItem);
router.post('/items/:itemId/bids', authenticateToken, bidController.placeBid);

module.exports = router;
