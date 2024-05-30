const { Item, Bid, User } = require('../models/item');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage });

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createItem = [
    upload.single('image'),
    async (req, res) => {
        const { name, description, starting_price, end_time } = req.body;
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        try {
            const item = await Item.create({ name, description, starting_price, end_time, image_url });
            res.status(201).json({ message: 'Item created successfully', item });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
];

exports.updateItem = async (req, res) => {
    const { name, description, starting_price, end_time } = req.body;

    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        item.name = name || item.name;
        item.description = description || item.description;
        item.starting_price = starting_price || item.starting_price;
        item.end_time = end_time || item.end_time;

        await item.save();
        res.json({ message: 'Item updated successfully', item });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ message: 'Item not found' });

        await item.destroy();
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
