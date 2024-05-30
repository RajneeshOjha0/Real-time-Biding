const { server } = require('./server');
const db = require('./models');

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
