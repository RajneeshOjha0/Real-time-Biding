const { Bid, Item, User } = require('../models/bid');
const io = require('../server').io;

exports.getBidsByItem = async (req, res) => {
    try {
        const bids = await Bid.findAll({ where: { item_id: req.params.itemId }, include: [User] });
        res.json(bids);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.placeBid = async (req, res) => {
    const { bid_amount } = req.body;
    const userId = req.user.id;

    try {
        const item = await Item.findByPk(req.params.itemId);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        if (bid_amount <= item.current_price) {
            return res.status(400).json({ message: 'Bid amount must be higher than current price' });
        }

        const bid = await Bid.create({ item_id: item.id, user_id: userId, bid_amount });
        item.current_price = bid_amount;
        await item.save();

        io.emit('bid', { itemId: item.id, bid });
        res.status(201).json({ message: 'Bid placed successfully', bid });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
