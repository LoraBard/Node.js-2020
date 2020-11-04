const bcrypt = require('bcrypt');
const { SALT } = require('../common/config');

const generateHash = async data => {
  return await bcrypt.hash(data, +SALT);
};

module.exports = generateHash;
