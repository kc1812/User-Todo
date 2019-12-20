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

userModel.prototype.validPassword = function (password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.password)
      .then((res) => {
        resolve({ "valid": res, "user": this });
      })
      .catch((err) => {
        reject(err);
      });

  });

};
// create table with user model
userModel.sync()
  .then(() => console.log('Oh yeah! User table created successfully'))
  .catch(err => { throw err; });

const saveUserDb = (userObj) => userModel.create(userObj);
const getUserDb = (userId) => userModel.findByPk(userId);
const getAllUserDb = () => userModel.findAll();
const getUserFromUserameDb = (username) => userModel.findOne({ where: { username: username } });

module.exports = {
  saveUserDb,
  getUserDb,
  getAllUserDb,
  getUserFromUserameDb
};
