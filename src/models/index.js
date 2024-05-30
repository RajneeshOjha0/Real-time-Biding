const { Sequelize } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: 'mysql',
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Item = require('./item')(sequelize, Sequelize);
db.Bid = require('./bid')(sequelize, Sequelize);
db.Notification = require('./notification')(sequelize, Sequelize);

// Associations
db.Item.hasMany(db.Bid, { foreignKey: 'item_id' });
db.Bid.belongsTo(db.Item, { foreignKey: 'item_id' });

db.User.hasMany(db.Bid, { foreignKey: 'user_id' });
db.Bid.belongsTo(db.User, { foreignKey: 'user_id' });

db.User.hasMany(db.Notification, { foreignKey: 'user_id' });
db.Notification.belongsTo(db.User, { foreignKey: 'user_id' });

module.exports = db;
