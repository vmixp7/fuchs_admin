require('dotenv').config();
const bcrypt = require('bcrypt');
const { sequelize, User } = require('../models');

const [, , username, password] = process.argv;

if (!username || !password) {
    console.log('Usage: node scripts/createAdmin.js <username> <password>');
    process.exit(1);
}

(async () => {
    await sequelize.sync();
    const hash = await bcrypt.hash(password, 10);
    await User.create({ username, passwordHash: hash });
    console.log(`✅ Admin user "${username}" created`);
    process.exit(0);
})();
