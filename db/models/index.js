const { User, UserSchema } = require('./user.model');


function setupModels(sequilze) {
  User.init(UserSchema, User.config(sequilze));
}

module.exports = setupModels;
