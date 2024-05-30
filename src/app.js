const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const bidRoutes = require('./routes/bidRoutes');
const notificationRoutes = require('./routes/notificationRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

app.use('/users', userRoutes); // Ensure the imported routes are used correctly
app.use('/items', itemRoutes);
app.use('/bids', bidRoutes);
app.use('/notifications', notificationRoutes);

module.exports = app;
