import dbHandler from "../../utils/dbHandler";
import Sequelize from 'sequelize';
import bcrypt from 'bcryptjs';

const sequelize = dbHandler.db;

const userModel = sequelize.define('user', {
  username: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  }
});

//pre hook to save hash instead of password
userModel.beforeCreate((user, options) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) {
          return reject(error);
        }

        user.password = hash;
        return resolve(user, options);
      });
    });
  });

});

//prototype method for validating password with hash stored in db
userModel.prototype.validPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password)
      .then((res) => {
        resolve({ "valid": res, "user": this });
      })
      .catch((err) => {
        reject({
          statusCode: 500,
          message: "Internel server error",
          error: err
        });
      });

  });

};

// create table with user model
userModel.sync()
  .then(() => console.log('Oh yeah! User table created successfully'))
  .catch(err => { throw err; });

// functions for operation on user database
const saveUserDb = (userObj) => userModel.create(userObj);
const getUserByIdDb = (userId) => userModel.findByPk(userId);
const getAllUserDb = () => userModel.findAll();
const getUserByUsernameDb = (username) => userModel.findOne({ where: { username: username } });

module.exports = {
  saveUserDb,
  getUserByIdDb,
  getAllUserDb,
  getUserByUsernameDb,
  userModel
};
