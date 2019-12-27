import dbHandler from "../../utils/dbHandler";
import Sequelize from 'sequelize';
import { userModel } from "../Users/Model";

const sequelize = dbHandler.db;

const todoModel = sequelize.define('todo', {
  task: {
    type: Sequelize.STRING,
  },
  completed: {
    type: Sequelize.BOOLEAN,
  }
});
userModel.hasMany(todoModel);

// create table with todo model
todoModel.sync()
  .then(() => console.log('Oh yeah! Todo table created successfully'))
  .catch(err => { throw err; });

// functions for operation on user database
const saveTodoDb = (todoObj) => todoModel.create(todoObj);
const getTodoByIdDb = (todoId) => todoModel.findByPk(todoId);
const getAllTodoDb = (userId) => todoModel.findAll({ where: { userId: userId }, attributes: { exclude: ['updatedAt'] } });
const updateTodoDb = (todoObj, todoId) => todoModel.update(todoObj, { where: { id: todoId } });
const deleteTodoDb = (todoId) => todoModel.destroy({ where: { id: todoId } });

module.exports = {
  saveTodoDb,
  getTodoByIdDb,
  getAllTodoDb,
  updateTodoDb,
  deleteTodoDb
};
