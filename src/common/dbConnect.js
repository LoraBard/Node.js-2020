const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('./config');
const User = require('../resources/users/user.model.js');
const logger = require('../utils/logger');

async function dbConnect(fn) {
  try {
    const db = mongoose.connection;
    db.on('error', logger.error.bind(logger, 'Connection error'));
    db.on('open', async () => {
      db.dropDatabase();
      logger.log(
        'info',
        `Success database connection.\n url ${mongoose.connection.host}\n nameBD: ${mongoose.connection.name}\n port: ${mongoose.connection.port}`
      );
      await User.create({
        password: 'admin',
        login: 'admin'
      });
      fn();
    });
    await mongoose.connect(MONGO_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  } catch (err) {
    logger.log('error', `database Not connected! ${err}`);
  }
}
module.exports = dbConnect;
