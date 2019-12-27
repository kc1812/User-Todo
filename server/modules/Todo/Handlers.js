import { getAllTodoDb, saveTodoDb, getTodoByIdDb, updateTodoDb, deleteTodoDb } from "./Model";

const saveTodo = todoObj => {
  return new Promise((resolve, reject) => {
    saveTodoDb(todoObj)
      .then(todo => {
        if (todo) {
          resolve({
            statusCode: 201,
            message: "Todo Successfully Created",
            data: null
          });
        } else {
          reject({
            statusCode: 500,
            message: "Internel server error, while creating todo",
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

const getTodoById = (userId, todoId) => {
  return new Promise((resolve, reject) => {
    getTodoByIdDb(todoId)
      .then(todo => {
        if (todo) {
          if (todo.userId == userId) {
            resolve({
              statusCode: 200,
              message: "Todo",
              data: todo
            });
          } else {
            reject({
              statusCode: 401,
              message: "Unauthorized access to other users todo",
              error: null
            });
          }
        } else {
          reject({
            statusCode: 404,
            message: "Todo Not Found",
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

const getAllTodo = (userId) => {
  return new Promise((resolve, reject) => {
    getAllTodoDb(userId)
      .then(data => {
        resolve({
          statusCode: 200,
          message: "",
          data: data
        });

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

const updateTodo = (userId, todoObj, todoId) => {
  return new Promise((resolve, reject) => {
    //checking if todo belongs to that user only
    getTodoById(userId, todoId)
      .then(result => {

        //todo belongs to user
        return updateTodoDb(todoObj, todoId);

      })
      .then(data => {
        resolve({
          statusCode: 200,
          message: "Todo updated successfully",
          data: data
        });

      })
      .catch(err => {
        reject({
          statusCode: err.statusCode || 500,
          message: err.message || "Internel server error",
          error: null
        });
      });
  });
};

const deleteTodo = (userId, todoId) => {
  return new Promise((resolve, reject) => {
    //checking if todo belongs to that user only
    getTodoById(userId, todoId)
      .then(result => {
        //todo belongs to user
        return deleteTodoDb(todoId);

      })
      .then(data => {
        resolve({
          statusCode: 200,
          message: "Todo deleted successfully",
          data: data
        });

      })
      .catch(err => {
        reject({
          statusCode: err.statusCode || 500,
          message: err.message || "Internel server error",
          error: null
        });
      });
  });
};

module.exports = { saveTodo, getAllTodo, getTodoById, updateTodo, deleteTodo };
