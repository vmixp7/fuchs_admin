const sequelize = require('../config/database');
const User = require('./User');

async function initDB() {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synced');
}

module.exports = { sequelize, User, initDB };
