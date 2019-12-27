import { saveUserDb, getUserByIdDb, getAllUserDb, getUserByUsernameDb } from "./Model";

const saveUser = userObj => {
  return new Promise((resolve, reject) => {
    saveUserDb(userObj)
      .then(user => {
        if (user) {
          resolve({
            statusCode: 201,
            message: "User Successfully Registered",
            data: null
          });
        } else {
          reject({
            statusCode: 500,
            message: "Internel server error, while creating user",
            error: null
          });
        }
      })
      .catch(err => {
        reject({
          statusCode: 500,
          message: "Internel server error",
          error: err
        });
      });
  });
};

const getAllUser = () => {
  return new Promise((resolve, reject) => {
    getAllUserDb()
      .then(user => {
        if (user) {
          resolve({
            statusCode: 200,
            message: "",
            data: user
          });
        } else {
          reject({
            statusCode: 500,
            message: "Internel server error, while fetching all users",
            error: null
          });
        }
      })
      .catch(err => {
        reject({
          statusCode: 500,
          message: "Internel server error",
          error: err
        });
      });
  });
};

const getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    getUserByIdDb(userId)
      .then(user => {
        // console.log(1234, user);
        if (user) {
          resolve({
            statusCode: 200,
            data: user,
            message: ""
          });
        } else {
          reject({
            statusCode: 404,
            message: "User Not Found",
            error: null
          });
        }
      })
      .catch(err => {

        reject({
          statusCode: 500,
          message: "Internel server error",
          error: err
        });
      });
  });
};
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    getUserByUsernameDb(username)
      .then(user => {
        if (user) {
          resolve({
            statusCode: 200,
            data: user,
            message: "User Found"
          });
        } else {
          reject({
            statusCode: 404,
            error: null,
            message: "User Not Found"
          });
        }
      })
      .catch(err => {
        reject({
          statusCode: 500,
          message: "Internel server error",
          error: err
        });
      });

  });

};


module.exports = { saveUser, getAllUser, getUserById, getUserByUsername };
