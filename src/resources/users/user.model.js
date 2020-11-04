const uuid = require('uuid');
const mongoose = require('mongoose');

const generateHash = require('../../utils/generateHash');

const userSchema = new mongoose.Schema(
  {
    name: String,
    login: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      default: uuid
    },
    token: String
  },
  { versionKey: false }
);

userSchema.pre('save', async function(next) { //eslint-disable-line
  const user = this;
  if (user.isModified('password')) {
    user.password = await generateHash(user.password);
  }
  next();
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
