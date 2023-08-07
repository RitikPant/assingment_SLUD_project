// database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('lal10', 'root', '', {
    host: 'localhost',
    dialect: 'mysql', // The database dialect you are using (e.g., 'mysql', 'postgres', 'sqlite')
});

// Test the database connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize;
