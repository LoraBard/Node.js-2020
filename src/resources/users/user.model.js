const uuid = require('uuid');
const mongoose = require('mongoose');

const generateHash = require('../../utils/generateHash');

const userSchema = new mongoose.Schema(
  {
    name: String,
    token: String,
    login: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      default: uuid
    }
  },
  { versionKey: false }
);

userSchema.pre('save', async function() { //eslint-disable-line
  if (this.isModified('password')) {
    this.password = await generateHash(this.password);
  }
});

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
