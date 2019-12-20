import { saveUserDb, getUserDb, getAllUserDb, getUserFromUserameDb } from "./Model";

const saveUser = userObj => {
  return new Promise((resolve, reject) => {
    saveUserDb(userObj)
      .then(user => {
        if (user) {
          resolve({
            statusCode: 201,
            message: "Created"
          });
        } else {
          reject({
            statusCode: 500,
            message: "Internel server error, while creating user"
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
            message: user
          });
        } else {
          reject({
            statusCode: 500,
            message: "Internel server error, while creating user"
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

const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    getUserDb(userId)
      .then(user => {
        if (user) {
          resolve({
            statusCode: 200,
            message: user
          });
        } else {
          reject({
            statusCode: 500,
            message: "Internel server error, while creating user"
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
    getUserFromUserameDb(username)
      .then(user => {
        if (user) {
          resolve({
            statusCode: 200,
            data: user
          });
        } else {
          reject({
            statusCode: 400,
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


module.exports = { saveUser, getAllUser, getUser, getUserByUsername };
